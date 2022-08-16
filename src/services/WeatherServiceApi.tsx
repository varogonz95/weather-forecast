import axios, { AxiosResponse } from 'axios';
import { IApiSettings, ZipCodeParam } from '../models/ApiModels';
import { Weather } from '../models/Weather';
import { WeatherServiceEnpoints } from './ApiConstants';
import BaseApiService from './BaseApiService';

export interface IWeatherApi {
    getCurrentWeather(zip: ZipCodeParam): Promise<Weather>;
    getForecast(zip: ZipCodeParam, days: number): Promise<Weather[]>;
}

export interface IWeatherApiConfig {
    appid: string;
    version: string;
    namespace: string;
    units?: string;
}

interface IWeatherResponse {
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
    };
    weather: { main: string; description: string; icon: string }[];
    sys: { country: string };
    name: string;
}

interface IForecastResponse {
    cnt: number;
    city: { name: string; country: string };
    list: {
        dt_txt: string;
        main: {
            temp: number;
            temp_min: number;
            temp_max: number;
        };
        weather: { main: string; description: string; icon: string }[];
    }[];
}

export class WeatherServiceApi extends BaseApiService implements IWeatherApi {
    constructor(apiSettings: IApiSettings, public serviceConfig: IWeatherApiConfig) {
        super(apiSettings);
    }

    public getCurrentWeather(zip: ZipCodeParam): Promise<Weather> {
        const { namespace, version, units, appid } = this.serviceConfig;
        const apiUri = [namespace, version, WeatherServiceEnpoints.CURRENT_WEATHER].join('/');
        const params = { zip: zip.encode(), units, appid };
        const url = this.createUrl(apiUri, params);
        return axios.get(url.toString()).then(this._transformWeatherResponseToModel);
    }

    public getForecast(zip: ZipCodeParam, days: number): Promise<Weather[]> {
        const { namespace, version, units, appid } = this.serviceConfig;
        const apiUri = [namespace, version, WeatherServiceEnpoints.FORECAST].join('/');
        const params = { appid, units, zip: zip.encode(), cnt: days * 8 };
        const url = this.createUrl(apiUri, params);
        return axios
            .get<IForecastResponse>(url.toString())
            .then(this._transformForecastResponseToModel);
    }

    private _transformForecastResponseToModel(
        response: AxiosResponse<IForecastResponse>
    ): Weather[] {
        const { list } = response.data;

        return list
            .filter((_, i) => i % 8 === 0)
            .map((w) => {
                const { main, description, icon } = w.weather[0];
                return new Weather({
                    time: w.dt_txt,
                    condition: { name: main, description, icon },
                    currentTemp: w.main.temp
                });
            });
    }

    private _transformWeatherResponseToModel(response: AxiosResponse<IWeatherResponse>): Weather {
        const { main, weather, name, sys } = response.data;
        return new Weather({
            currentTemp: main.temp,
            minTemp: main.temp_min,
            maxTemp: main.temp_max,
            city: { name, country: sys.country },
            condition: {
                name: weather[0].main,
                description: weather[0].description,
                icon: weather[0].icon
            }
        });
    }
}
