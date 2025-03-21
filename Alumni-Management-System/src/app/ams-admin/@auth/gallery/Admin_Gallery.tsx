import Admin_Update_Image_Gallery from '../../../../components/Admin_Update_Image_Gallery';
import { appDatabase } from '../../../../firebase/firebase';
import { collection, getDocs } from "firebase/firestore";
import Loader from '../../../../components/Loader';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


type GalleryImageType = { id: string; imageUrl: string; text: string };

export default function Admin_Gallery() {

    const [gallery, setGallery] = useState<GalleryImageType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchGallery = async () => {
            // if (gallery.length == 0) setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(appDatabase, "gallery"));
                const images = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryImageType));
                sessionStorage.setItem("_GALLERY_DATA_", JSON.stringify(images));
                setGallery(images);
            } catch (error) {
                console.error("Error fetching gallery images:", error);
            } finally {
                setLoading(false);
            }
        };

        const GetLocalData = () => {
            try {
                const s = sessionStorage.getItem("_GALLERY_DATA_");
                if (s) {
                    const parsedData = JSON.parse(s) as GalleryImageType[];
                    setGallery(parsedData);
                    setLoading(false);
                }
            } catch (error) { }
        };

        GetLocalData();
        fetchGallery();
    }, []);

    const deleteGalleryImage = async (id: string) => {
        try {
            setGallery(prev => prev.filter(item => item.id !== id));
            toast.success("Image deleted successfully!");
        } catch (error) {
            toast.error("Error deleting image:");
        }
    };

    const updateGalleryImage = async (id: string, newImageUrl: string, newText: string) => {
        try {
            setGallery(prev => prev.map(item => item.id === id ? { ...item, imageUrl: newImageUrl, text: newText } : item));
            toast.success("Image updated successfully!");
        } catch (error) {
            toast.error("Error updating image:");
        }
    };

    if (loading) {
        return <div className="text-center mt-40 flex justify-center items-center gap-3">
            <Loader size='25px' />
            <p className='text-xl'>Loading...</p>
        </div>
    }


    return (
        <div className="p-28">
            <h2 className="text-3xl font-semibold mb-4 text-center">Gallery</h2>

            <div className="flex flex-wrap gap-10 pt-16">
                {gallery.map((item) => <Gallery_Image data={item} key={item.id} />)}
            </div>

            <div className="flex justify-center items-center mt-40">
                <Link to={"add"} className='font-semibold text-white bg-blue-500 rounded-md px-6 py-2'>Add Images</Link>
            </div>
        </div>
    );

    function Gallery_Image({ data }: { data: GalleryImageType }) {
        const [selectImage, setselectImage] = useState(false);

        return <div className="">
            {selectImage ? <Admin_Update_Image_Gallery {...{
                ...data, closeModal: () => setselectImage(false),
                deleteGalleryImage, updateGalleryImage

            }} /> : null}
            <div className="border border-slate-200 p-2 rounded-2xl shadow-md shadow-slate-200 w-80" onClick={() => setselectImage(true)}>
                <img src={data.imageUrl} alt={data.text} className="w-full h-40 object-contain rounded" />
                <p className="text-center mt-2 font-medium text-lg">{data.text}</p>
            </div>
        </div>
    }

}