/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { EntryPatient, Gender } from "../types";

// Name
const isString = (text: any): text is string => (
    typeof text === 'string' || text instanceof String
);
const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error('Parameter exception: Name');
    }
    return name;
};

// Gender
const isGender = (g: any): g is Gender => (
    Object.values(Gender).includes(g)
);
const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Parameter exception: Gender');
    }
    return gender;
};

// Occupation
const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Parameter exception: Occupation');
    }
    return occupation;
};

// Date
const isDate = (date: string): boolean => !!Date.parse(date);
const parseBirthDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Parameter exception: Date');
    }
    return date;
};

// SSN
const isSSN = (ssn: string): boolean => (
    /^\d{6}[+-A]\w{3,4}/.test(ssn) // doesn't fully test checksum marker validity
);
const parseSSN = (ssn: any): string => {
    if (!ssn || !isString(ssn) || !isSSN(ssn)) {
        throw new Error('Parameter exception: SSN');
    }
    return ssn;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const createPatient = (body: any): EntryPatient => {
    return {
        name: parseName(body.name),
        gender: parseGender(body.gender),
        occupation: parseOccupation(body.occupation),
        ssn: parseSSN(body.ssn),
        dateOfBirth: parseBirthDate(body.dateOfBirth),
    };
};

export default createPatient;