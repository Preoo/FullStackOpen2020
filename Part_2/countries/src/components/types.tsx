// Common shared types

type Languages = {
    iso639_1: string,
    iso639_2: string,
    name: string,
    nativeName: string
}

export type Country = {
    name: string,
    area: number,
    flag: string,
    capital: string,
    population: number,
    languages: Languages[]
}
