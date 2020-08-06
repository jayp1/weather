import React from 'react';
import axios from 'axios';

import Location from '../../components/location/location';
import Forecast from '../../components/forecast/forecast';
import './weather.css';
import API_KEY from '../../api_key';

class Weather extends React.Component {

    state = {
        currentWeather: null,
        location: null,
        forecast: null,
        city: null,
        error: null,
    }

    componentDidMount = () => {
        this.getDeviceLocation();
        //this.getForecastFromCity();
    }
    getForecastFromCity = (city) => {

        axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=' + UNIT + '&appid=' + API_KEY)
            .then(response => {
                this.setState({
                    currentWeather: response.data,
                    error: null,
                });
            }).catch(error => {
                this.setState({ error: "Error : Invalid City" })
            });

        axios.get('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=' + UNIT + '&appid=' + API_KEY)
            .then(response => {
                this.setState({
                    forecast: response.data,
                    error: null,
                });
            }).catch(error => {
                this.setState({ error: "Error : Invalid City" })
            });
    }

    getDeviceLocation = () => {
        if (navigator.geolocation) {
            console.log("Location is enabled");
            navigator.geolocation.getCurrentPosition(position => {
                this.getCoordsForecast(position.coords.latitude, position.coords.longitude);
                this.setState({ location: position });
            });
        } else {
            console.log("Location is not enabled by the browser");
        }

    }
    setLocation = (position) => {
        this.setState({ location: position });
        this.getCoordsForecast(position.coords.latitude, position.coords.longitude);
    }

    getCoordsForecast = (latitude, longitude) => {
        
        axios.get('https://api.openweathermap.org/data/2.5/weather?lat=' + Number.parseFloat(latitude).toFixed(4) + '&lon=' + Number.parseFloat(longitude).toFixed(4) + '&units=' + UNIT + '&appid=' + API_KEY)
            .then(response => {
                this.setState({
                    currentWeather: response.data,
                    error: null,
                });
            })
            .catch(error => {
                console.log(error);
            });
        axios.get('https://api.openweathermap.org/data/2.5/forecast?lat=' + Number.parseFloat(latitude).toFixed(4) + '&lon=' + Number.parseFloat(longitude).toFixed(4) + '&units=' + UNIT + '&appid=' + API_KEY)
            .then(response => {
               
                this.setState({
                    forecast: response.data,
                    error: null,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleCitySearch = (event, city) => {
        event.preventDefault();
        if (city !== null || city !== '') {
            this.getForecastFromCity(city);
        }

    }

    render() {
        return (
            <div className="MainContent">
                <nav className="navbar navbar-dark bg-dark">
                    <span className="navbar-brand mb-0 h1">My Weather App</span>
                </nav>

                <div className="container">
                    <Location error={this.state.error} clicked={(event, city) => this.handleCitySearch(event, city)} location={this.state.location ? this.state.location.coords.latitude : null} />
                    <Forecast current={this.state.currentWeather} forecast={this.state.forecast ? this.state.forecast : null} />
                </div>


            </div>
        );
    }
}
const UNIT = 'metric';
export default Weather;