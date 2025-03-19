import mongoose, { Document, Schema } from 'mongoose';

type CategoryType = 'SC' | 'ST' | 'OBC' | 'OPEN' | 'NT';
type GenderType = 'Male' | 'Female';
type BloodGroupType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
type ClassType = 'MBA' | 'MCA';
type YearType = 'FY' | 'SY';

interface StudentDetailsInterface extends Document {
    teams: string;
    email: string;
    class: ClassType;
    contact: string;
    year: YearType;
    category: CategoryType;
    gender: GenderType;
    address: string;
    bloodGroup: BloodGroupType;
    dob: string;
}

const studentDetailsSchema: Schema<StudentDetailsInterface> = new Schema({
    teams: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    class: {
        type: String,
        enum: ['MBA', 'MCA'],
    },
    contact: { type: String },
    year: {
        type: String,
        enum: ['FY', 'SY'],
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
    },
    address: { type: String },
    category: {
        type: String,
        enum: ['SC', 'ST', 'OBC', 'OPEN', 'NT'],
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    dob: { type: String },
},
    { timestamps: true }
);

const StudentDetails_Model = mongoose.models.StudentDetails ||
    mongoose.model<StudentDetailsInterface>('StudentDetails', studentDetailsSchema);

export default StudentDetails_Model;
