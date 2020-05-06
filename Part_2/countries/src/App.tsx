import React, { useState, useEffect } from 'react';
import { get_countries } from './services/countries'
import { CountrySearch } from './components/country_search'
import { Country } from './components/types'
import { CountryView } from './components/country_list';

const filter_country_by_name = (country_list: Country[], query: string): Country[] => {
  return country_list.filter(country => country.name.toLowerCase().includes(query.toLowerCase()))
}

// Components start with Uppercase
const App = () => {
  // State
  const [all_countries, update_all_countries] = useState([] as Country[])
  const [filter_string, set_filter_string] = useState('')
  const [countries, set_countries] = useState(all_countries)
  const [display_limit,] = useState(10)

  // Get country is defined as async as network queries can stall and such.
  // Following construct is required to make Typescript happy about resolving
  // async functions in effetct hooks.
  // See => https://medium.com/javascript-in-plain-english/how-to-use-async-function-in-react-hook-useeffect-typescript-js-6204a788a435
  useEffect(() => {
    (async () => {
      await get_countries().then(countries => update_all_countries(countries))
    })()
  }, [])

  useEffect(() => {
    const filtered_countries = filter_country_by_name(all_countries, filter_string)
    set_countries(filtered_countries)
  }, [filter_string, all_countries])

  // Event handlers
  //  * select country for details => pass this country cose to new api endpoint for getting full details \
  //      fetch new details with a useEffect set to refresh on state 'fetch_new_details' or something
  //  * country list should refresh only on page load

  return (
    <div>
      <h1>Find pointless info about a country</h1>
      <CountrySearch value={filter_string} onChange={(event: any) => set_filter_string(event.target.value)} />
      <CountryView countries={countries} display_limit={display_limit} />
    </div>
  )
}

export default App;
