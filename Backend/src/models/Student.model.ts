import mongoose, { Document, Schema } from 'mongoose';


interface StudentInterface extends Document {
    name: string;
    password: string;
    email: string;
    profileImage: string;
    batch: string;
    linkedin: string;
    bio: string;
    interests: string;
}


const StudentSchema: Schema = new Schema<StudentInterface>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    interests: {
        type: String,
        default: "",
        required: true
    }
});


const Student_Model = mongoose.models.Student || mongoose.model<StudentInterface>('Student', StudentSchema);

export default Student_Model;