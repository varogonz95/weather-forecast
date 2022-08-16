import React from 'react';
import { Weather } from '../../models/Weather';

interface IForecastContentProps {
    collection: Weather[];
}

export default class ForecastContent extends React.Component<IForecastContentProps> {
    constructor(props: IForecastContentProps) {
        super(props);
    }

    private _parseDate(date: Date): string {
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }

    public render() {
        const { collection } = this.props;
        return (
            <div className='menu'>
                <p className='menu-label'>{collection.length}-day forecast</p>
                <ul className='menu-list is-capitalized'>
                    {collection.map((data, i) => {
                        const parsedDate = this._parseDate(data.timeAsDate);
                        return (
                            <li key={i}>
                                <div className='level has-text-left'>
                                    <div className='level-item'>
                                        <figure className='image is-48x48'>
                                            <img
                                                src={`http://openweathermap.org/img/wn/${data.condition.icon}@4x.png`}
                                            />
                                        </figure>
                                    </div>
                                    <div className='level-item'>
                                        <time dateTime={parsedDate}>{parsedDate}</time>
                                    </div>
                                    <div className='level-item'>{data.condition.description} </div>
                                    <div className='level-item'>
                                        {data.currentTemp.toPrecision(3)} &deg;F
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
