import mongoose, { Document, Schema } from 'mongoose';

type AdminRole = "super" | "pass";

interface AdminInterface extends Document {
    name: string;
    teams: string;
    password: string;
    role: AdminRole;
}

const adminSchema: Schema<AdminInterface> = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    teams: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ["super", "pass"],
        required: true,
        trim: true,
    }
},
    { timestamps: true }
);



const Admin_Model = mongoose.models.Admin || mongoose.model<AdminInterface>('Admin', adminSchema);

export default Admin_Model;