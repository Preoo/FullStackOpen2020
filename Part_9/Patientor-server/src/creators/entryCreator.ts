/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Entry, HospitalEntry, OccupationalHealthcareEntry,
    HealthCheckEntry, HealthCheckRating
} from "../types";
import { v1 as uuid1} from 'uuid';

// Properties validation functions
const isString = (text: any): text is string => (
    typeof text === 'string' || text instanceof String
);
const isNumber = (value: any): value is number => !isNaN(value);
const isDate = (date: string): boolean => !!Date.parse(date);
type BaseEntryFields = Pick<Entry, 'date' | 'description' | 'specialist'>;
const hasBaseEntryFields = (entry: BaseEntryFields): boolean => (
    isDate(entry.date) && isString(entry.description) && isString(entry.specialist)
);
const isHealthRating = (value: any): value is HealthCheckRating => (
    Object.values(HealthCheckRating).includes(value)
);

// Type validation
const isHospitalEntry = (entry: any): entry is HospitalEntry => {
    return entry.type === 'Hospital' && hasBaseEntryFields(entry);
};

const isOccupationalEntry = (entry: any): entry is OccupationalHealthcareEntry => {
    return entry.type === 'OccupationalHealthcare' && hasBaseEntryFields(entry)
        && isString(entry.employerName);
};

const isHealthCheckEntry = (entry: any): entry is HealthCheckEntry => {
    return entry.type === 'HealthCheck' && hasBaseEntryFields(entry)
        && isNumber(entry.healthCheckRating)
        && isHealthRating(entry.healthCheckRating);
};

const exctractCommonFields = (entry: Entry): Omit<Entry, 'type' | 'id'> => {
    const { description, date, specialist, diagnosisCodes, } = entry;
    return {
        description, date, specialist, diagnosisCodes
    };
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const createEntry = (entry: any): Entry => {
    // To ease UI phase and to hard backend, only save needed props!
    if (isHospitalEntry(entry)) {
        const common = exctractCommonFields(entry);
        const { type, discharge } = entry;
        return { ...common, type, discharge, id: uuid1() };
    } else if (isOccupationalEntry(entry)) {
        const common = exctractCommonFields(entry);
        const { type, employerName, sickLeave } = entry;
        return {
            ...common, type, employerName,
            sickLeave, id: uuid1()
        };
    } else if (isHealthCheckEntry(entry)) {
        const common = exctractCommonFields(entry);
        const { type, healthCheckRating } = entry;
        return { ...common, type, healthCheckRating, id: uuid1() };
    } else {
        throw new Error('Received entry had invalid shape');
    }
};

export default createEntry;