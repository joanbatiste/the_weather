import React,{useState} from 'react';
import './home.css';
import axios from "axios";

const Home = () => {

    //hook
    // const [city, setCity] = useState('');

    //Api endpoint
    // let key = 'd0b859cda57dcb019c77583a67e9aae6';
    let weatherBaseUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=39.4702&lon=-0.376805&exclude=hourly,minutely&appid=d0b859cda57dcb019c77583a67e9aae6';
    let currentWeather = 'https://api.openweathermap.org/data/2.5/weather?q=valencia&appid=d0b859cda57dcb019c77583a67e9aae6'
    const searchCity = async (query) => {
        let result = await axios.get(currentWeather);
        console.log(result);
    }

    return (
        <div className='content'>
            <div className="title">The Weather</div>
            <div className="search-input">
                <input></input>
                <button className="send-query" onClick={()=> searchCity()}>enviar</button>
            </div>
            
        </div>
    )
};

export default Home;