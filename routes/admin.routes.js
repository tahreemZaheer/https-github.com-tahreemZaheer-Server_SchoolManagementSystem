import { Router } from "express";
import jwt from 'jsonwebtoken';
import { courseModel } from "../config/models/course.js";
import multer, { diskStorage } from "multer";
import { teacherModel } from "../config/models/teacher.js";


const adminRouter = Router();
const authMiddleware= async (req,res, next) =>{
    console.log("auth middleware");
    const token = req.headers.token;
    if(!token) {
        res.status(401).json({message: "Unauthorized"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);        
        const teacher = await teacherModel.findById({_id:decoded.teacherId });
        if(!teacher) {
            res.status(401).json({message: "Unauthorized"});
            res.send();
        }
        next();
    }
    catch(err) {
        res.status(401).json({message: err});
        res.send();
    }
};

adminRouter.use(authMiddleware);

const storage = diskStorage({
    destination: (req, file, cb)=>{
        cb(null, process.env.UPLOAD_PATH)
    },
    filename: (req, file, cb) =>{ 
        
        const filename = file.originalname.toLowerCase().split(' ').join('.')
        cb(null, filename);
    }
});

let upload=  multer({
    storage: storage,
    fileFilter: (req, file, cb)=>{
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
            cb(null, true)
        }
        else {
            cb(null, false)
            return cb(new Error("only .jpg,.jpeg and .png extensions allowed"));
        }
    }
})

adminRouter.post('/createcourse', async (req,res)=>{
    try {
        console.log(req.body);
        const {title, body, teacherId} = req.body;
        const newCourse = await courseModel.create({
            title, 
            body,
            teacher: teacherId,
        });

        res.status(201).json({newCourse});
    }
    catch(err) {
        console.log(err);
    }
});

adminRouter.get('/instructor',async(req,res)=>{
    try{
        const data = await teacherModel.find();

        if(data){
            res.json(data);
        }
        else{
            res.json({message:"no Instructor available"});
        }
        res.end();
    }catch(e){
        console.error(e);
    }
});
export default adminRouter;