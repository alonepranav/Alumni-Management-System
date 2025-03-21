import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { appDatabase, appStorage } from "../firebase/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ChangeEvent, useState } from "react";
import { CgClose } from "react-icons/cg";
import toast from "react-hot-toast";


const Admin_Update_Image_Gallery = ({
    id, imageUrl, text, closeModal, deleteGalleryImage, updateGalleryImage }: {
        id: string, imageUrl: string, text: string,
        closeModal: () => void, deleteGalleryImage: (id: string) => void,
        updateGalleryImage: (id: string, newImageUrl: string, newText: string) => void
    }) => {

    const [uploading, setUploading] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);
    const [textD, setTextD] = useState(text);
    const [preview, setPreview] = useState<string | null>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!textD.trim()) return toast.success("Please select image and add description", { icon: "🤨" });

        let nUrl = imageUrl;

        setUploading(true);
        if (image) {
            try {
                const storageRef = ref(appStorage, `gallery/${image.name}`);
                const snapshot = await uploadBytes(storageRef, image);
                nUrl = await getDownloadURL(snapshot.ref);
            } catch (error) {
                toast.error("Error updating image:");
            }
        }

        try {
            await updateDoc(doc(appDatabase, "gallery", id), {
                imageUrl: nUrl, text: textD
            });
            updateGalleryImage(id, nUrl, textD);
        } catch (error) {
            toast.error("Upload failed");
        }
        finally {
            setUploading(false);
        }
    };

    const DeleteTheImage = async () => {
        try {
            setDeleting(true);
            await deleteDoc(doc(appDatabase, "gallery", id));
            deleteGalleryImage(id)
        } catch (error) { }
        finally {
            setDeleting(false);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen w-screen absolute top-0 left-0 bg-[rgba(0,0,0,0.3)]">
            <div className="relative p-5 border border-slate-300 rounded-3xl bg-white shadow-lg shadow-slate-500 w-[28rem]">
                <p onClick={closeModal} className="p-2 hover:bg-slate-200 cursor-pointer rounded-full absolute top-2 right-2">
                    <CgClose size={24} />
                </p>

                <p className="text-center font-semibold text-2xl pb-6">Update Image</p>
                <div>
                    <label htmlFor="select-gallery-image" className="h-80 w-full border border-slate-200 rounded-2xl flex justify-center items-center text-neutral-400 flex-col">
                        <img src={preview ? preview : imageUrl} alt="Preview" className="w-full h-full object-contain mt-2" /> :
                    </label>
                </div>
                <input id="select-gallery-image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />

                <br />

                <label className="font-semibold">Enter the Title/Description</label>
                <input type="text" placeholder="Enter description" value={textD}
                    onChange={(e) => setTextD(e.target.value)}
                    className="w-full p-2 border border-gray-400 rounded mt-2" required />

                <button onClick={handleUpload} disabled={uploading} className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    {uploading ? "Updating..." : "Update"}
                </button>
                <button onClick={() => DeleteTheImage()} disabled={uploading} className="mt-4 w-full bg-rose-500 text-white py-2 rounded hover:bg-blue-600">
                    {deleting ? "Deleting..." : "Delete"}
                </button>
            </div>
        </div>
    );
};


export default Admin_Update_Image_Gallery;