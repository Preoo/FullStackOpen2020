import express from 'express';
import Ping from './routes/ping';

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/ping', Ping);

app.listen(PORT, () => console.log(`Server up on port ${PORT}`));
