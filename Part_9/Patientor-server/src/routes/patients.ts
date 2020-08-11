import express from 'express';
import patientService from '../services/patientService';
import createPatient from '../creators/patientCreator';
const router = express.Router();

router.get('/', (_req, res) => {
    const patients = patientService.getPatients();
	res.json(patients);
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const patient = patientService.getPatientFull(id);
    if (patient) {
        return res.json(patient);
    } else {
        return res.status(404).json({ error: 'No valid patients found.'});
    }
});

router.post('/', (req, res) => {
    const newPatient = patientService.addPatient(createPatient(req.body));
    res.json(newPatient);
});

export default router;