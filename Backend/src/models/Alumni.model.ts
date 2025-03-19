import mongoose, { Schema, Document } from "mongoose";


export interface AlumniInterface extends Document {
    name: string;
    email: string;
    password: string;
    batch: string;
    company: string;
    designation: string;
    linkedin: string;
    bio: string;
    achievements: string;
    profileImage: string;
}


const AlumniSchema: Schema = new Schema<AlumniInterface>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    linkedin: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    achievements: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        required: true,
    },
});


const Alumni = mongoose.model<AlumniInterface>("Alumni", AlumniSchema);

export default Alumni;