import express from 'express';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import adminRouter from './routes/admin.routes.js';
import mainRouter from './routes/main.routes.js';
import { connectDB } from './config/db.js';
import cors from 'cors';
import multer from 'multer';


const app = express();  
const upload = multer();
config();
connectDB();

app.use(bodyParser.json());
app.use(cors());
app.use('/',mainRouter);
app.use('/admin',adminRouter);




app.listen(process.env.PORT,()=>{
    console.log("server started listening on port:",process.env.PORT)
})

export default app;