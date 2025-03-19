import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { Dispatch, useState } from "react";
import GetImageId from "../functions/GetImageId";
import { GrClose } from "react-icons/gr";
import Routes from "../constants/Routes";
import toast from "react-hot-toast";
import Loader from "./Loader";
import axios from "axios";


export default function User_Update_Profile_Photo({ profilePhoto, email, name, setUpdatePhoto, type }: {
    profilePhoto: string, email: string, name: string, setUpdatePhoto: Dispatch<boolean>, type: "alumni" | "student"
}) {
    const [selectedImage, setSelectedImage] = useState<string | null>(profilePhoto);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setloading] = useState(false);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const imageFile = event.target.files[0];
            setFile(imageFile);
            setSelectedImage(URL.createObjectURL(imageFile));
        }
    };

    const updateProfilePhoto = async (email: string, photoURL: string) => {
        try {
            const res = await axios.post(type == "alumni" ? Routes.Alumni_Update_Photo() : Routes.Student_Update_Photo(), { email, photoURL });

            if (res.data.success) {
                toast.success(res.data.message);
                setloading(false);
                setUpdatePhoto(false);
            }
            else {
                toast.error(res.data.message);
                setloading(false);
                setUpdatePhoto(false);
            }
        } catch (error) {
            console.error("Error updating profile photo:", error);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        const storage = getStorage();
        const storageRef = ref(storage, `ams/${GetImageId()}`);
        setloading(true);

        try {
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);

            await updateProfilePhoto(email, downloadURL);

        } catch (error) {
            console.error("Error uploading file: ", error);
            alert("Failed to update profile photo");
        }
    };

    return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-black/80 z-50 flex justify-center items-center">
            <p onClick={() => setUpdatePhoto(false)} className="cursor-pointer fixed top-3 right-3 p-3 flex justify-center items-center bg-white rounded-xl">
                <GrClose size={20} />
            </p>
            <div className="">
                <label htmlFor="img-pick" className="text-center flex justify-center items-center cursor-pointer">
                    <img src={selectedImage || profilePhoto} alt={name} className="h-60 w-60 rounded-full" />
                </label>
                <input type="file" accept="image/*" id="img-pick" onChange={handleImageChange} className="hidden" />
                <p className="text-white font-semibold text-3xl text-center mt-4">{name}</p>

                <div className="flex justify-center mt-8">
                    <button className="font-semibold bg-white cursor-pointer mx-auto rounded-md w-48 flex justify-center py-2" onClick={handleUpload}>
                        {loading ? <Loader size="25px" /> : "Update Profile Image"}
                    </button>
                </div>
            </div>
        </div>
    );
}