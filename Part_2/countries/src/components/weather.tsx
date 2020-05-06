import React, { useEffect, useState } from 'react';
import { Country } from './types';
import { get_weather } from '../services/countries';
import { WeatherPanel } from './weather_panel';

type WeatherOrNull = Weather | null
type Weather = {
    location: {
        name: string,
        country: string,
    },
    current: {
        temperature: number,
        weather_icons: string[],
        weather_descriptions: string[]
        wind_speed: number,
        wind_degree: number,
        wind_dir: number,
        humidity: number,
        feelslike: number,
    }
}
const Weather = ({ name, capital }: Country) => {
    const [weather, set_weather] = useState(null as WeatherOrNull)
    useEffect(() => {
        (async () => {
            await get_weather(capital).then(weather => set_weather(weather))
        })()
    }, [capital])

    return (
        <div>
            {
                weather
                    ? <WeatherPanel {...weather as Weather} />
                    : <p>{`Weather panel for capital city ${capital} in country ${name} will be added here.`}</p>
            }
        </div>
    )
}

export { Weather }