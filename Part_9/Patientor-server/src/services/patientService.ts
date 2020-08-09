import rawPatients from '../../data/patients.json';
import { Patient, SanitizedPatient, EntryPatient } from '../types';
import { v1 as uuid1} from 'uuid';
const patients = rawPatients as Patient[];

const getPatients = ():SanitizedPatient[] => {
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

const addPatient = (patient:EntryPatient):SanitizedPatient => {
    const newPatient = {
        id: uuid1(),
        ...patient
    };
    patients.push(newPatient);
    return {
        id: newPatient.id,
        name: newPatient.name,
        dateOfBirth: newPatient.dateOfBirth,
        gender: newPatient.gender,
        occupation: newPatient.occupation
    };
};

export default {
    getPatients,
    addPatient
};