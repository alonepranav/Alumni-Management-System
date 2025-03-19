import mongoose, { Schema, Document } from "mongoose";

interface CommentInterface {
    user: string;
    text: string;
}

export interface PostInterface extends Document {
    author: "student" | "alumni";
    title: string;
    user: string;
    content: string;
    likes: string[];
    comments: CommentInterface[];
    time: string;
    imageId: string;
}

const postSchema = new Schema<PostInterface>(
    {
        user: {
            type: String,
            required: true,
            trim: true,
        },
        author: {
            type: String,
            enum: ["student", "alumni"],
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        likes: {
            type: [String],
            default: [],
        },
        time: {
            type: String,
            required: true,
        },
        imageId: {
            type: String,
            required: true,
        },
        comments: [
            {
                user: {
                    type: [String],
                    required: true,
                },
                text: {
                    type: String,
                    required: true,
                }
            },
        ],
    },
    { timestamps: true }
);


const Post_Model = mongoose.models.Post || mongoose.model<PostInterface>("Post", postSchema)

export default Post_Model;