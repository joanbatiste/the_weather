import React,{useState} from 'react';
import './home.css';
import axios from "axios";
import WeatherCard from '../../components/weather-card/weather-card';
import { getAllByDisplayValue } from '@testing-library/react';

const Home = (props) => {

    //hook
    const [city, setCity] = useState("");
    const [resume, setResume] = useState({
        name: "",
        country: "",
        forecast: [{
            date: "",
            temp: "",
            max_temp: "",
            min_temp: "",
            icon: "",
        }]
    });
    console.log(city);

    //handler
    const handlerState = (e) => {
        setCity({...city, [e.target.name]: e.target.value });
        console.log(city);
    };

    //Api endpoint
    // let key = 'd0b859cda57dcb019c77583a67e9aae6';
    let weatherBaseUrl = `https://api.openweathermap.org/data/2.5/onecall?${city.city}&exclude=hourly,minutely&appid=d0b859cda57dcb019c77583a67e9aae6`;
    let currentWeather = `https://api.openweathermap.org/data/2.5/forecast?q=${city.city}&appid=d0b859cda57dcb019c77583a67e9aae6`;
    
    const extractDayHour = (date) => {
        let newDate = new Date(date);
        let options = {hour: '2-digit'};
        let hour = newDate.toLocaleTimeString(options);
        return hour;
    };

    const searchCityWeather = async (city) => {
        let result = await axios.get(currentWeather);
        if (result){
            let dayList = result.data.list;
            let forecastDays = [];
        
            dayList.forEach(function(element,index){
                
                let newForecast = {
                    date: "",
                    temp: "",
                    max_temp: "",
                    min_temp: "",
                    icon: "",
                }
                if (extractDayHour(element.dt_txt) === '12:00:00'){
                    newForecast['date'] = element.dt_txt;
                    newForecast['temp'] = (element.main.temp - 273.15).toFixed(0)+'\u00b0';
                    newForecast['max_temp'] = (element.main.temp - 273.15).toFixed(0)+'\u00b0';
                    newForecast['min_temp'] = (element.main.temp - 273.15).toFixed(0)+'\u00b0';
                    newForecast['icon'] = element.weather[0].icon;
        
                    forecastDays.push(newForecast);
                }
            })
            
            setResume({...resume, 
                name: result.data.city.name,
                country: result.data.city.country,
                forecast : forecastDays
            })
        }
        
    }

    return (
        <div className='content'>
            <div className="title p-20">The Weather</div>
            <div className="search-input p-20">
                <input type="text" maxLength="30" placeholder="Insert a city" name="city" onChange={handlerState} ></input>
                <button className="send-query" onClick={()=> searchCityWeather()}>send</button>
            </div>
            <div className="show-weather">
                {resume.name ? (<WeatherCard city={resume}/>) : (<div>No city selected</div>)}
            </div>
        </div>
    )
};

export default Home;