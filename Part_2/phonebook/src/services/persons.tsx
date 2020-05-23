import { Contact } from "../App"
import Axios, { AxiosResponse } from "axios"

// const base_url:string = 'http://localhost:3001/api/persons'
const base_url:string = '/api/persons'

const get = ():Promise<AxiosResponse<any>> => {
    return Axios.get(base_url)
}

const add = (contact:Contact):Promise<AxiosResponse<any>> => {
    return Axios.post(base_url, contact)
}

const modify = (id:number, contact:Contact):Promise<AxiosResponse<any>> => {
    return Axios.put(`${base_url}/${id}`, contact)
}

const remove = (id:number):Promise<AxiosResponse<any>> => {
    return Axios.delete(`${base_url}/${id}`)
}

export {get, add, modify, remove}