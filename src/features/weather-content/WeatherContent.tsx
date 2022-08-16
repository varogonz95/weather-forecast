import React from 'react';
import { IWeather } from '../../models/Weather';

export interface IWeatherContentProps {
    weather: IWeather;
}

export default class WeatherContent extends React.Component<IWeatherContentProps, any> {
    constructor(props: IWeatherContentProps) {
        super(props);

        this.state = {};
    }

    render() {
        const { weather } = this.props;
        return (
            <>
                <h1 className='title is-3'>
                    {[weather.city.name, weather.city.country].join(', ')}
                </h1>
                <article className='media'>
                    <figure className='media-left'>
                        <p className='image is-64x64'>
                            <img
                                src={`http://openweathermap.org/img/wn/${weather.condition.icon}@2x.png`}
                            />
                        </p>
                    </figure>
                    <div className='media-content'>
                        <p className='title is-2'>{weather.currentTemp.toPrecision(3)} &deg;F</p>
                        <p className='subtitle is-6 is-capitalized has-text-grey'>
                            {weather.condition.description}
                        </p>
                    </div>
                    <div
                        className='media-content'
                        style={{ borderLeft: 'thin solid lightgrey', paddingLeft: '.5rem' }}
                    >
                        <p className='is-3 has-text-grey'>
                            <span className='has-text-success'>&#9650;</span>
                            &nbsp; High: {weather.maxTemp.toPrecision(3)} &deg;F
                        </p>
                        <p className='is-3 has-text-grey'>
                            <span className='has-text-danger'>&#9660;</span>
                            &nbsp; Low: {weather.minTemp.toPrecision(3)} &deg;F
                        </p>
                    </div>
                </article>
            </>
        );
    }
}
