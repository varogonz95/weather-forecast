export interface ICondition {
    icon: string;
    name: string;
    description: string;
}

export interface ICity {
    country: string;
    name: string;
}

export interface IWeather {
    time: string;
    minTemp: number;
    maxTemp: number;
    currentTemp: number;
    condition: ICondition;
    city: ICity;
}

export class Weather implements IWeather {
    public time: string;
    public minTemp: number;
    public maxTemp: number;
    public currentTemp: number;
    public condition: ICondition;
    public city: ICity;

    public get timeAsDate(): Date {
        return new Date(this.time);
    }

    constructor(obj?: Partial<IWeather>) {
        this.time = obj?.time;
        this.minTemp = obj?.minTemp || 0;
        this.maxTemp = obj?.maxTemp || 0;
        this.currentTemp = obj?.currentTemp || 0;
        this.condition = obj?.condition;
        this.city = obj?.city;
    }
}
