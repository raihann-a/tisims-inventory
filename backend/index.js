import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', async (req, res, next) => {
    res.send('Hello World!');
})
app.listen(4000, () => {
    console.log('Server running on port 4000');
})