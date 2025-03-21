import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import cors from 'cors';

import ConnectDB from './database/ConnectDB';
ConnectDB();

const app: Application = express();

import Routes from './main';

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// All Routes
app.use(Routes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.clear();
    console.log(`Admin Server - http://localhost:${PORT}`);
});
