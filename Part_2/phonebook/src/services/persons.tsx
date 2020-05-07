import { Contact } from "../App"
import Axios, { AxiosResponse } from "axios"

const base_url:string = 'http://localhost:3001/persons'

const get = ():Promise<AxiosResponse<any>> => {
    return Axios.get(base_url)
}

const add = (contact:Contact):Promise<AxiosResponse<any>> => {
    return Axios.post(base_url, contact)
}

// const modify = (contact:Contact):Promise<AxiosResponse<any>> => {
//     return
// }

// const remove = (contact:Contact):Promise<AxiosResponse<any>> => {
//     return
// }

export {get, add, /*modify, remove*/}