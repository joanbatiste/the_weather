import React,{useState} from 'react';
import './home.css';
import axios from "axios";

const Home = (props) => {

    //hook
    const [city, setCity] = useState("");
    const [resume, setResume] = useState({
        name: "",
        temp : "",
        max_temp: "",
        min_temp: "",
        icon: ""
    });

    //handler
    const handlerState = (e) => {
        setCity({...city, [e.target.name]: e.target.value });
        console.log(city);
    };

    //Api endpoint
    // let key = 'd0b859cda57dcb019c77583a67e9aae6';
    let weatherBaseUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=39.4702&lon=-0.376805&exclude=hourly,minutely&appid=d0b859cda57dcb019c77583a67e9aae6`;
    let currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city.city}&appid=d0b859cda57dcb019c77583a67e9aae6`;
    let icon_url = ` http://openweathermap.org/img/wn/${resume.icon}.png`

    const searchCityWeather = async (city) => {
        let result = await axios.get(currentWeather);
        console.log(result);
        setResume({...resume, 
            name: result.data.name,
            temp: (result.data.main.temp - 273.15).toFixed(0)+'\u00b0',
            max_temp: (result.data.main.temp_max - 273.15).toFixed(0),
            min_temp: (result.data.main.temp_min - 273.15).toFixed(0),
            icon: result.data.weather[0].icon
        })
        console.log(resume);
    }

    return (
        <div className='content'>
            <div className="title">The Weather</div>
            <div className="search-input">
                <input type="text" maxLength="30" placeholder="Insert a city" name="city" onChange={handlerState}></input>
                <button className="send-query" onClick={()=> searchCityWeather()}>send</button>
            </div>
            <div className="show-weather">
                <div className="weather-card">
                    <div className="title-card">The weather in {resume.name}</div>
                    <div className="current-temp">{resume.temp}</div>
                    <div className="icon-weather">
                        <img src={icon_url} alt=""></img>
                    </div>
                    <div className="max-temp">{resume.max_temp}</div>
                    <div className="min-temp">{resume.min_temp}</div>
                </div>
            </div>
        </div>
    )
};

export default Home;