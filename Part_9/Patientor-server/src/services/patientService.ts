import rawPatients from '../../data/patients.json';
import { Patient, SanitizedPatient, EntryPatient } from '../types';
import { v1 as uuid1} from 'uuid';

const patients = (rawPatients as Patient[]).map(p => ({...p, entries: []}));

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

export default {
    getPatients,
    getPatientFull,
    addPatient
};