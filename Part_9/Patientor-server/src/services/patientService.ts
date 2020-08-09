import patients from '../../data/patients.json';
import { Patient, SanitizedPatient } from '../types';

const getPatients = ():SanitizedPatient[] => {
    const unsafePatients = patients as Patient[];
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

export default {
    getPatients
};