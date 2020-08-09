import express from 'express';
import cors from 'cors';
import Ping from './routes/ping';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.use('/api/ping', Ping);

app.listen(PORT, () => console.log(`Server up on port ${PORT}`));
