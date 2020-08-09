export type Diagnose = {
    name: string
    code: string
    latin?: string
};

export type Patient = {
    id: string
    name: string
    dateOfBirth: string
    ssn: string
    gender: string
    occupation: string
};
export type SanitizedPatient = Omit<Patient, 'ssn'>;