import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";

import performTask from './routes/performTask.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true 
}));

const PORT = process.env.PORT || 5000;
const WINDOW_SIZE = parseInt(process.env.WINDOW_SIZE) || 10;


app.get('/numbers/:numberid',performTask);
app.get('/',(req,res)=>{
    res.send("Welcome to the Numbers API");
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});