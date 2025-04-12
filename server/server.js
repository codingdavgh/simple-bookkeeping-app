import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import transactionRoutes from './routes/transaction.js';
import teamRoutes from './routes/team.js';
import './recurring.js';

dotenv.config();
const app = express();
app.use(cors());

// INPUT VALIDATION ...
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// ROUTES ...
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/team', teamRoutes);


// SERVER STARTUP ...
const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    console.log("Database connected");
    app.listen(PORT, ()=>{
        console.log(`Server running on https://localhost:${PORT}`)
    })
})
.catch((error) => console.log(`Error: ${error.message}`));