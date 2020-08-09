import express from 'express';
import cors from 'cors';
import Ping from './routes/ping';
import Diagnoses from './routes/diagnoses';
import Patients from './routes/patients';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.use('/api/ping', Ping);
app.use('/api/diagnoses', Diagnoses);
app.use('/api/patients', Patients);
app.listen(PORT, () => console.log(`Server up on port ${PORT}`));
