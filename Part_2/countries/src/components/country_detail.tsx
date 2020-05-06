import React from 'react';
import { Country } from './types';
import { Weather } from './weather'

export const CountryDetail = (props: Country) => {
    if (props) {
        const { name, area, flag, capital, population, languages, ...rest } = props
        return (
            <div>
                <h3>{name}</h3>
                <ul>
                    {languages?.map((lang: any) => (
                        <li key={lang.iso639_1}>{lang.name}</li>
                    ))}
                </ul>
                {
                    flag
                    ? <img src={flag} height='50px' alt={`National flag of ${name}.`}/>
                    : null
                }
                <p>{area}</p>
                <p>{capital}</p>
                <p>{population}</p>

                { name 
                    ? <Weather  {...props}/>
                    : null 
                }
                
            </div>
        )
    } else { return null }
}