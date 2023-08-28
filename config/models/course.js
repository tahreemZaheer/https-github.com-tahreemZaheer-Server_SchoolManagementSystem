import mongoose, { Schema } from "mongoose";

const CourseSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
      
    },
    updatedAt:{
        type: Date,
        default: Date.now,
    },
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'teacher',
    }

});

export const courseModel = mongoose.model("course",CourseSchema);