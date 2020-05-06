import React from 'react'
import { Weather } from './weather'

export const WeatherPanel = ({ location, current }: Weather) => {
    const weather_icon = current.weather_icons.reduce((icon: string, next_icon: string) => next_icon, '')
    return (
        <div>
            <h4>Weather</h4>
            <img src={weather_icon} alt={current.weather_descriptions.reduce((a, n) => n, '')} height='50px' />
            <p>{`Weather in ${location.name}, ${location.country} is ${current.weather_descriptions.join(', ')}.`}</p>
            <p>{`Temperature is ${current.temperature} and it feels like ${current.feelslike}`}</p>
            <p>{`Wind speed is ${current.wind_speed} and it's blowing to ${current.wind_dir}`}</p>
            <p>{`Humidity is ${current.humidity}.`}</p>
        </div>
    )
}
