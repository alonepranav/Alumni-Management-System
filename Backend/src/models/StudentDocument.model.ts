import mongoose, { Document, Schema } from 'mongoose';

type DocumentType = "pdf" | "png" | "jpg" | "jpeg";

interface StudentDocumentInterface extends Document {
    teams: string;
    title: string;
    documentId: string;
    documentType: DocumentType;
    note: string;
    time: string;
}

const studentDocumentSchema: Schema<StudentDocumentInterface> = new Schema({
    teams: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    documentId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    documentType: {
        required: true,
        type: String,
        enum: ['pdf', 'png', "jpg", "jpeg"]
    },
    note: {
        type: String,
        default: "",
        trim: true
    },
    time: {
        type: String,
        required: true,
        trim: true
    }
},
    { timestamps: true }
);

const StudentDocument_Model = mongoose.models.StudentDocument || mongoose.model<StudentDocumentInterface>('StudentDocument', studentDocumentSchema);

export default StudentDocument_Model;
