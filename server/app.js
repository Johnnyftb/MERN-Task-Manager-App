import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import router from './routes/tasks.js';

const app = express();


app.use(express.json());
app.use(cors());

app.use("/", router);

const port = process.env.port || 5000;

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
}

const CONNECT = async () => {
    try {
        await mongoose.connect("mongodb+srv://mongo:mongodbpassword@nodeexpressprojects.ctbowzd.mongodb.net/task-manager-app?retryWrites=true&w=majority", connectionParams);
        console.log("Connected to Database");
        app.listen(port, () => console.log(`Server is running on port ${port}`));
    } catch (error) {
        console.log(error);
    }
}

CONNECT();

