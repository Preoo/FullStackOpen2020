export type Diagnose = {
    name: string
    code: string
    latin?: string
};

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
    'Healthy' = 0,
    'LowRisk',
    'HighRisk',
    'CriticalRisk'
}

interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating;
}
interface SickLeave { startDate: string; endDate: string; }
interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: SickLeave;
}

interface Discharge { date: string; criteria: string; }
interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: Discharge;
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

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