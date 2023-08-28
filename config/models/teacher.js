import mongoose, { Schema } from "mongoose"

const TeacherSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique :true
    },
    email:{
        type: String,
        required: true,
        unique :true
    },
    password:{
        type: String,
        required: true,
        
    }
});

export const teacherModel = mongoose.model("teacher",TeacherSchema);