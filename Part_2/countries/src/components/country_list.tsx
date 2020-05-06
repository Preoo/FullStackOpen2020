import React, { useState, useEffect } from 'react';
import { Country } from './types';
import { CountryDetail } from './country_detail';

type CountryViewProps = {
    countries: Country[],
    display_limit: number,
}
export const CountryView = (props: CountryViewProps) => {

    const [selected, set_selected] = useState('')

    useEffect(() => {
        if (props.countries.length === 1) {
            set_selected(props.countries[0].name)
        }
    }, [props.countries])

    if (!(props.countries.length)) return <p>Too little</p>
    if (props.countries.length > props.display_limit) return <p>Too much</p>
    if (props.countries.length > 1) {
        return (
            <div>
                {
                    props.countries.map((country: Country) => (
                        <p key={country.name}> {country.name} <button onClick={() => (set_selected(country.name))}>show</button></p>)
                    )
                }
                <CountryDetail {...props.countries.filter((country) => country.name === selected)[0]} />
            </div>
        )
    }
    return (
        <CountryDetail {...props.countries.filter((country) => country.name === selected)[0]} />
    )
}