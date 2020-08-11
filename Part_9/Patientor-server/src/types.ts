export type Diagnose = {
    name: string
    code: string
    latin?: string
};

export type Entry = {

};

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export type Patient = {
    id: string
    name: string
    gender: string
    occupation: string
    ssn?: string
    dateOfBirth?: string
    entries: Entry[]
};
export type SanitizedPatient = Omit<Patient, 'ssn' | 'entries'>;
export type EntryPatient = Omit<Patient, 'id' | 'entries'>;