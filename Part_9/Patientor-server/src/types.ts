export type Diagnose = {
    name: string
    code: string
    latin?: string
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
};
export type SanitizedPatient = Omit<Patient, 'ssn'>;
export type EntryPatient = Omit<Patient, 'id'>;