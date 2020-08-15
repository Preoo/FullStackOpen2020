import express from 'express';
import patientService from '../services/patientService';
import createPatient from '../creators/patientCreator';
import { Entry } from '../types';
import createEntry from '../creators/entryCreator';
const router = express.Router();

const validateEntry = (entry: Entry): boolean => {
    // Naive check that entry has proper type
    switch (entry.type) {
        case 'Hospital':
        case 'OccupationalHealthcare':
        case 'HealthCheck':
            return true;
        default:
            return false;
    }
};

router.get('/', (_req, res) => {
    const patients = patientService.getPatients();
	res.json(patients);
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const patient = patientService.getPatientFull(id);

    if (!patient) {
        return res.status(404).json({
            error: 'No valid patient found.'
        });
    }

    // Do some light validation on patient entries. Return 500 if fails.
    if (!patient.entries.every(entry => validateEntry(entry))) {
        return res.status(500).json({
            error: 'Internal server error. Invalid type of entry type.'
        });
    }

    return res.json(patient);
});

router.post('/', (req, res) => {
    try {
        const newPatient = patientService.addPatient(createPatient(req.body));
        return res.json(newPatient);
    } catch (e) {
        return res.status(400).json({ error: 'Patient entry was invalid.' });
    }
});

router.post('/:id/entries', (req, res) => {
    const id = req.params.id;
    try {
        const updatedPatient = patientService.addEntry(id, createEntry(req.body));
        if (updatedPatient) {
            return res.json(updatedPatient);
        } else {
            return res.status(404).json({
                error: 'No valid patient found.'
            });
        }
    } catch (e) {
        return res.status(400).json({ error: 'Entry fields validation failed.' });
    }
});

export default router;