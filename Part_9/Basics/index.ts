import express from 'express';
import calculateBMI from './bmiCalculator';
const app = express();

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

const PORT = 3000;

app.listen(PORT, () => {
    console.info(`TS-Express on port ${PORT}`);
});