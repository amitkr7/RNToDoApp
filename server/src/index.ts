import express from 'express';
import cors from 'cors';
import noteRouter from './routers/note';

import './db';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/note', noteRouter);

app.listen(8000, () => {
  console.log('Listening on Port 8000');
});
