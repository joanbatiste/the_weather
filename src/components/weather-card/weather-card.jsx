import React from 'react';
import './weather-card.css';

const WeatherCard = ({ city }) => {
    console.log(city);

    const extractWeekDay = (date) => {
        let newDate = new Date(date);
        let options = { weekday: 'long' };
        return newDate.toLocaleDateString("en-EN", options);
    };
    

    return (

        <div className="show-forecast">
            <div className="title-card">The weather in {city.name}, {city.country}</div>
            <div className="five-days-forecast">
            {city.forecast.map(item => {
                return(
                    <div className="weather-card">
                        
                        <div className="week-day">{extractWeekDay(item.date)}</div>
                        <div className="current-temp">{item.temp}</div>
                        <div className="icon-weather">
                            <img src={`http://openweathermap.org/img/wn/${item.icon}.png`} alt=""></img>
                        </div>
                        <div className="temps-list">
                            <div className="max-temp">{item.max_temp}</div>
                            <div className="min-temp">{item.min_temp}</div>
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
    )
};
export default WeatherCard;