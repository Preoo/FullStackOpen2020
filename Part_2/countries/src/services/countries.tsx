import Axios from 'axios'
const countries_api: string = 'https://restcountries.eu/rest/v2'
const weather_api: string = 'https://weather-api.test'

const get_countries = async (fields?: string) => {
    const api_string = fields
        ? countries_api + `/all?fields=${fields}`
        : countries_api + '/all'
    return Axios
        .get(api_string, { responseType: 'json' })
        .then(res => {
            // console.debug(res.data)
            return res.data
        })
        .catch(err => console.error(`get_countries error ${err.message}`))
}

// const get_country = async (country_name: string, fields?: string) => {
//     const api_string = fields
//         ? countries_api + `/name/${country_name}?fields=${fields}`
//         : countries_api + `/name/${country_name}`
//     return Axios
//         .get(api_string, { responseType: 'json' })
//         .then(res => res.data)
//         .catch(err => console.error(`get_countries error ${err.message}`))
// }

const get_weather = async (city: string) => {
    // define API_KEY in .env file located in project root
    // format is REACT_APP_[MY_VARIABLE]=[VARIABLE_VALUE]
    const weather_api_key: string | undefined = process.env.REACT_APP_WEATHER_API
    console.log(weather_api_key)
    return Axios
        .get(weather_api + '/res/api_key=' + weather_api_key)
        .then(res => res.data)
        .catch(err => {
            console.error(`get_weather error ${err.message}, call didn't succeed. Replying with mock-data.`)
            return Axios.get('http://localhost:3000/mock-weather.json').then(res => res.data)
        })
}

export { get_countries, get_weather }