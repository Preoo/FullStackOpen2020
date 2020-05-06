import React, { useEffect, useState } from 'react';
import { Country } from './types';
import { get_weather } from '../services/countries';
import { WeatherPanel } from './weather_panel';

type WeatherOrNull = Weather | null
type Weather = {
    
}
const Weather = (country:Country) => {
    const [weather, set_weather] = useState(null as WeatherOrNull)
    useEffect(() => {
        (async () => {
            await get_weather(country.capital).then(weather => set_weather(weather))
          })()
    }, [country.capital])

    return (
        <div>
            <h4>Weather</h4>
            <p>{`Weather panel for capital city ${country.capital} in country ${country.name} will be added here.`}</p>
            {
                console.log()
            }
            {/* <WeatherPanel {...weather?.list[0]?.weather[0]}/> */}
        </div>
    )
}

export {Weather}