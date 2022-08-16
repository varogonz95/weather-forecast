import 'bulma/css/bulma.min.css';
import React from 'react';
import { Context, Theme as BulmaThemes, ThemeContext } from 'react-bulma-theme';
import './App.css';
import ForecastContent from './features/forecast-content/ForecastContent';
import ThemeProvider from './features/theme-provider/ThemeProvider';
import ThemeToggle from './features/theme-toggle/ThemeToggle';
import WeatherContent from './features/weather-content/WeatherContent';
import ZipInput from './features/zip-input/ZipInput';
import logo from './logo.png';
import { IZipCode, ZipCodeParam } from './models/ApiModels';
import { Weather } from './models/Weather';
import { defaultCountryCode } from './services/ApiConstants';
import { IWeatherApi } from './services/WeatherServiceApi';

interface IAppState {
    isLoading: boolean;
    zipCode: IZipCode;
    zipInputErrors: string[];
    weather: Weather;
    forecast: Weather[];
    theme: BulmaThemes;
}

interface IAppProps {
    weatherApi: IWeatherApi;
}

export default class App extends React.Component<IAppProps, IAppState> {
    static contextType = ThemeContext;

    private readonly _weatherApi: IWeatherApi;
    private readonly _backgroundStyle = {
        backgroundImage: `url(${logo})`,
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: 'center',
        backgroundPositionY: '15%'
    };

    constructor(props: IAppProps) {
        super(props);

        // Initialize state
        this.state = {
            isLoading: false,
            zipCode: { zip: -1, country: defaultCountryCode },
            zipInputErrors: [],
            weather: null,
            forecast: [],
            theme: 'default'
        };

        // Set dependencies
        this._weatherApi = props.weatherApi;
    }

    public onZipInputChange(zip: string) {
        const currentZipCode = { ...this.state.zipCode };
        this.setState({ zipCode: { ...currentZipCode, zip: Number(zip) }, zipInputErrors: [] });
    }

    public submitZipInput(e: any) {
        const { zipCode } = this.state;

        if (zipCode.zip > 0) {
            const zipCodeParam = new ZipCodeParam(zipCode);
            this.setState({ isLoading: true });

            Promise.all([
                this._weatherApi.getCurrentWeather(zipCodeParam),
                this._weatherApi.getForecast(zipCodeParam, 5)
            ])
                .then(([weather, forecast]) => this.setState({ weather, forecast }))
                .catch((err) => console.log(err))
                .finally(() => this.setState({ isLoading: false }));
        } else {
            this.setState({ zipInputErrors: ['You must enter a ZIP code.'] });
        }
    }

    public onThemeChange(checked: boolean) {
        this.setState({ theme: checked ? 'default' : 'slate' });
    }

    public render() {
        const { isLoading, zipInputErrors, weather, forecast, theme } = this.state;
        return (
            <>
                <ThemeProvider theme={theme} />
                <section className='hero is-medium is-fullheight'>
                    <div className='hero-body' style={{ ...this._backgroundStyle }}>
                        <div className='container'>
                            <div className='columns is-centered'>
                                <div className='column is-half'>
                                    <p className='title'>Weather Forecast</p>

                                    <div className='card'>
                                        <header className='card-header is-shadowless'>
                                            <div className='card-header-icon'>
                                                <ThemeToggle
                                                    name='themeToggle'
                                                    onChange={(e) =>
                                                        this.onThemeChange(e.target.checked)
                                                    }
                                                />
                                            </div>
                                        </header>
                                        <div className='card-content'>
                                            <form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    this.submitZipInput(e);
                                                }}
                                            >
                                                <ZipInput
                                                    loading={isLoading}
                                                    errors={zipInputErrors}
                                                    onChange={(e) =>
                                                        this.onZipInputChange(e.target.value)
                                                    }
                                                    onClick={(e) => this.submitZipInput(e)}
                                                />
                                            </form>
                                        </div>

                                        {weather && (
                                            <div className='card-content'>
                                                <WeatherContent weather={weather} />
                                            </div>
                                        )}
                                        {forecast?.length > 0 && (
                                            <div className='card-content'>
                                                <ForecastContent collection={forecast} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}
App.contextType = ThemeContext;
