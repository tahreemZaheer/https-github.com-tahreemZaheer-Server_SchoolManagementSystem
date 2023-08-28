import { Router } from "express";
import { hash, compare } from 'bcrypt';
import { courseModel } from "../config/models/course.js";
import { teacherModel } from "../config/models/teacher.js";
import jwt from 'jsonwebtoken';

const mainRouter = Router();


mainRouter.get('/course', async(req,res)=>{

    try{
        const data = await courseModel.find();
        const count = await courseModel.count();

        if(count>0){
            res.json(data);
        }
        else{
            res.json({message:"no courses available"});
        }
        res.end();
    }catch(e){
        console.error(e);
    }
});

    mainRouter.get('/course/:id', async(req,res)=>{

        try{
            let courseId = req.params.id;
            const data = await courseModel.findById({_id: courseId});
            
    
            if(data){
                res.json(data);
            }
            else{
                res.json({message:"no courses with specified id is available"});
            }
            res.end();
        }catch(e){
            console.error(e);
        }
    
});

mainRouter.post('/signup', async(req,res)=>{
    const {username, email, password} = req.body; 
    console.log(req.body);
    const encryptedPassword = await hash(password, 10);

    try {
        const user = await teacherModel.create({
            username,
            email,
            password: encryptedPassword,
        });

        res.status(201).json({ user});
        res.end();

    }
    catch(err) {
        console.log(err);
        res.json({message: err});
        res.end();
    }
});

mainRouter.post('/login', async(req,res)=>{
    
    const {username, password} = req.body;

    
    try{
        const teacher = await teacherModel.findOne({username});

        if(!teacher) {
            res.status(401).json({message: "User not found"});
            res.end();
        }

        const isPasswordValid = await compare(password, teacher.password);

        if(!isPasswordValid){
            res.status(401).json({message:"Unauthorized, invalid credentials"});
            res.end();
        }


        const token = jwt.sign({teacherId: teacher._id }, process.env.JWT_SECRET);
        res.status(200).json({token: token });
        res.end();

    }
    catch(err) {
        console.log(err);
    }

});


export default mainRouter;