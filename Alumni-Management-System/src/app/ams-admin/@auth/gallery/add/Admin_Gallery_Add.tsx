import { appDatabase, appStorage } from "../../../../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { BiUpload } from "react-icons/bi";
import toast from "react-hot-toast";


const Admin_Gallery_Add = () => {
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);
    const [text, setText] = useState("");
    const navigate = useNavigate();

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!image || !text.trim()) return toast.success("Please select image and add description", { icon: "🤨" });

        setUploading(true);
        const storageRef = ref(appStorage, `gallery/${image.name}`);

        try {
            const snapshot = await uploadBytes(storageRef, image);
            const downloadURL = await getDownloadURL(snapshot.ref);

            await addDoc(collection(appDatabase, "gallery"), {
                imageUrl: downloadURL,
                text,
                time: new Date().toString(),
            });

            toast.success("Image added to gallery successfully!");
            navigate("/ams-admin/gallery");
        } catch (error) {
            toast.error("Upload failed");
        }
        finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <div className="p-5 border border-slate-300 rounded-3xl shadow-lg shadow-slate-300 w-[28rem]">
                <div>
                    <label htmlFor="select-gallery-image" className="h-80 w-full border border-slate-200 rounded-2xl flex justify-center items-center text-neutral-400 flex-col">
                        {
                            preview ?
                                <img src={preview} alt="Preview" className="w-full h-full object-contain mt-2" /> :
                                <div className="flex justify-center items-center flex-col">
                                    <BiUpload size={50} />
                                    <p className="mt-5">Select an image to upload to gallery</p>
                                </div>
                        }

                    </label>
                </div>
                <input id="select-gallery-image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />

                <br />

                <label className="font-semibold">Enter the Title/Description</label>
                <input type="text" placeholder="Enter description" value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full p-2 border border-gray-400 rounded mt-2" required />

                <button onClick={handleUpload}
                    disabled={uploading}
                    className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    {uploading ? "Uploading..." : "Upload"}
                </button>
            </div>
        </div>
    );
};

export default Admin_Gallery_Add;
