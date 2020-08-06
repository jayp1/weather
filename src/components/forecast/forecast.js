import React from 'react';
import './forecast.css';

const forecast = props => {

    let tempInDegrees = '';
    let weatherImageSrc = null;
    let city;
    let country;
    let weekDay = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let windSpeed;
    let humidity;
    let precip = 0;
    let descrip = null;
    const d = new Date();
    const thisMonth = months[d.getMonth()];
    const thisWeekday = weekDay[d.getDay()];
    const thisYear = d.getFullYear();
    const thisMonthDay = d.getDate();
    d.setDate(d.getDate()+1);
    const weekday2 = weekDay[d.getDay()];
    d.setDate(d.getDate()+1);
    const weekday3 = weekDay[d.getDay()];
    d.setDate(d.getDate()+1);
    const weekday4 = weekDay[d.getDay()];
    

    if (props.forecast) {
        //const num = props.forecast.main.temp - 273.15;
        //tempInDegrees = Math.round((num + Number.EPSILON) * 100) / 100
        tempInDegrees = Math.round(props.forecast.list[0].main.temp);
        weatherImageSrc = "https://openweathermap.org/img/wn/" + props.forecast.list[0].weather[0].icon + '@2x.png';
        city = props.forecast.city.name;
        country = props.forecast.city.country;
        descrip = props.forecast.list[0].weather[0].description;

        windSpeed = props.forecast.list[0].wind.speed;
        humidity = props.forecast.list[0].main.humidity;
        for (let mm = 1; mm < 8; mm++) {
            if (props.forecast.list[mm].rain) {
                precip += props.forecast.list[mm].rain['3h'];
            }

        }

        precip = Math.round(precip, 2);


    } else {
        // Spinner
    }

    if (props.current){
        tempInDegrees = Math.round(props.current.main.temp);
        weatherImageSrc = "https://openweathermap.org/img/wn/" + props.current.weather[0].icon + '@2x.png';
        city = props.current.name;
        country = props.current.sys.country;
        descrip = props.current.weather[0].description;

        windSpeed = props.current.wind.speed;
        humidity = props.current.main.humidity;
    }

    return (

        <div className="Forecast">
            <div className="card text-center">
                <div className="card-header">
                    <h3>{city ?  city+', ' +country :'Enter City'}</h3>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-12">
                            <h6>{thisWeekday}, {thisMonthDay} {thisMonth} {thisYear}</h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="Icon">
                                {weatherImageSrc ? <img src={weatherImageSrc} alt="Weather Icon" />: null}
                                
                            </div>
                            <div className="Temperature">{tempInDegrees ? <span className="TempNum">{tempInDegrees}&deg;</span>: null} - {descrip}</div>
                        </div>

                    </div>

                    <div className="Stats row">
                        <div className="wind col-4">
                            <div>Wind Speed</div>
                            <div>{windSpeed} m/s</div>

                        </div>
                        <div className="humid col-4">
                            <div>Humidity</div>
                            <div>{humidity}%</div>
                        </div>
                        <div className="precip col-4">
                            <div>Precipitation (24h)</div>
                            <div>{precip ? precip : '0'}mm</div>
                        </div>

                    </div>
                </div>

            </div>

            <div className="card">
                <div className="future container-fluid">
                    <div className="row">
                        <div className="col-4">
                            <div className="FutureDays">
                                {weekday2}
                            </div>
                            <div className="FutureTemps">
                                {props.forecast ? Math.round(props.forecast.list[8].main.temp) : 'N/A'} &#8451;
                        </div>

                        </div>
                        <div className="col-4">
                            <div className="FutureDays">
                                {weekday3}
                            </div>
                            <div className="FutureTemps">
                                {props.forecast ? Math.round(props.forecast.list[16].main.temp) : 'N/A'} &#8451;
                        </div>
                        </div>
                        <div className="col-4">
                            <div className="FutureDays">
                                {weekday4}
                            </div>
                            <div className="FutureTemps">
                                {props.forecast ? Math.round(props.forecast.list[24].main.temp) : 'N/A'} &#8451;
                        </div>
                        </div>

                    </div>
                </div>
            </div>


        </div>

    );
}
export default forecast;