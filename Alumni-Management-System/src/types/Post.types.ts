
type PostType = {
    author: "student" | "alumni";
    title: string;
    user: string;
    content: string;
    likes: string[];
    comments: [{ user: string; text: string; }],
    time: string;
    imageId: string;
    _id: string;
}

export default PostType;