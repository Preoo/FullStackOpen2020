import express from 'express';
import patientService from '../services/patientService';
import createPatient from '../creators/patientCreator';
const router = express.Router();

router.get('/', (_req, res) => {
    const patients = patientService.getPatients();
	res.json(patients);
});

router.post('/', (req, res) => {
    const newPatient = patientService.addPatient(createPatient(req.body));
    res.json(newPatient);
});

export default router;