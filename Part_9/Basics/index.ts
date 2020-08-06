import express from 'express';
import calculateBMI from './bmiCalculator';
import calculateExercises, { ExercisesConfig, isValidExcercisesConfig } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello FullStack');
});

app.get('/bmi', (req, res) => {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);

    if (isNaN(weight) || isNaN(height)) {
        return res.status(400).json({
            error: 'malformed parameters'
        });
        
    }

    const bmi = calculateBMI(weight, height);
    return res.json({
        weight, height, bmi
    });
});

app.post('/exercises', (req, res) => {
    const body = req.body as ExercisesConfig;
    if (!body.target || !body.exerciseHours) {
        return res.status(400).json({
            error: 'missing parameters'
        });
    }
    if (isValidExcercisesConfig(body)) {
        const report = calculateExercises(body);
        return res.json(report);
    } else {
        return res.status(400).json({
            error: 'malformed parameters'
        });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.info(`TS-Express on port ${PORT}`);
});