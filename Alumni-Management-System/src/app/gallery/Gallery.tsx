import { collection, getDocs } from "firebase/firestore";
import { appDatabase } from "../../firebase/firebase";
import Loader from "../../components/Loader";
import { useEffect, useState } from "react";


type GalleryImageType = { id: string; imageUrl: string; text: string };

export default function Gallery() {
    const [galleryImages, setGalleryImages] = useState<GalleryImageType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchGallery = async () => {
        try {
            const querySnapshot = await getDocs(collection(appDatabase, "gallery"));
            const images = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryImageType));
            setGalleryImages(images);
            sessionStorage.setItem("_GALLERY_DATA_", JSON.stringify(images));
        } catch (error) {
            console.error("Error fetching gallery images:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const cachedData = sessionStorage.getItem("_GALLERY_DATA_");
        if (cachedData) {
            setGalleryImages(JSON.parse(cachedData) as GalleryImageType[]);
            setLoading(false);
        }
        fetchGallery();
    }, []);

    if (loading) {
        return (
            <div className="text-center mt-40 flex justify-center items-center gap-3">
                <Loader size="25px" />
                <p className="text-xl">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 pb-28 px-6">
            <div className="max-w-6xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-blue-500 mb-6">Gallery</h1>
                <p className="text-lg text-gray-700 mb-10">A collection of our best moments, achievements, and memories.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {
                        galleryImages.map((image) => (
                            <div key={image.id} className="bg-white shadow-md rounded-lg overflow-hidden border border-slate-200">
                                <div className="overflow-hidden h-60">
                                    <img src={image.imageUrl} alt={image.text}
                                        className="w-full h-60 p-4 object-cover hover:scale-110 transition-all" />
                                </div>
                                <div className="p-4">
                                    <p className="text-gray-800 text-center font-medium">{image.text}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
