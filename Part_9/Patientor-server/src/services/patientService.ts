import { Patient, SanitizedPatient, EntryPatient, Entry } from '../types';
import { v1 as uuid1} from 'uuid';
// Seed data
import patients from './patients';

const getPatients = (): SanitizedPatient[] => {
    const unsafePatients = patients;
    return unsafePatients.map(({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getPatientFull = (id: string): Patient | undefined => {
    const patient: Patient | undefined = patients.find(p => p.id === id);
    return patient;
};

const addPatient = (patient: EntryPatient): SanitizedPatient => {
    const newPatient = {
        id: uuid1(),
        entries: [],
        ...patient
    };
    patients.push(newPatient);
    return {
        id: newPatient.id,
        name: newPatient.name,
        dateOfBirth: newPatient.dateOfBirth,
        gender: newPatient.gender,
        occupation: newPatient.occupation,
    };
};

const addEntry = (patientId: string, entry: Entry): Patient | undefined => {

    const patient = patients.find(p => p.id === patientId);
    if (patient) {
        patient.entries.push(entry);
        return patient;
    } else {
        return undefined;
    }
};

export default {
    getPatients,
    getPatientFull,
    addPatient,
    addEntry
};