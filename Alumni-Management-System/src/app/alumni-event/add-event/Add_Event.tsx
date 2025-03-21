import { useState, ChangeEvent, FormEvent } from "react";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { appDatabase } from "../../../firebase/firebase";
import toast, { Toaster } from "react-hot-toast";

const storage = getStorage(); // Initialize Firebase Storage

interface EventFormData {
    title: string;
    description: string;
    date: string;
    venue: string;
    imageFile: File | null;
}

export default function AddEvent() {
    const [formData, setFormData] = useState<EventFormData>({
        title: "",
        description: "",
        date: "",
        venue: "",
        imageFile: null
    });

    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData({ ...formData, imageFile: file });
            setPreview(URL.createObjectURL(file)); // Show image preview
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = "";

            if (formData.imageFile) {
                // Upload image to Firebase Storage
                const imageRef = ref(storage, `event-images/${formData.imageFile.name}`);
                await uploadBytes(imageRef, formData.imageFile);
                imageUrl = await getDownloadURL(imageRef);
            }

            // Save event details to Firestore
            await addDoc(collection(appDatabase, "events"), {
                title: formData.title,
                description: formData.description,
                date: formData.date,
                venue: formData.venue,
                imageUrl,
            });

            toast.success("Event added successfully!");
            setFormData({ title: "", description: "", date: "", venue: "", imageFile: null });
            setPreview(null);
        } catch (error) {
            console.error("Error adding event:", error);
            toast.error("Failed to add event.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-screen bg-gray-50 py-20">
            <Toaster />
            <div className="bg-white px-6 pb-10 pt-7 rounded-2xl shadow-lg w-[40rem]">
                <h2 className="text-2xl font-bold text-center mb-8">Add Event</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="font-semibold mb-1 block">Title</label>
                    <input
                        type="text" name="title" placeholder="Event Title"
                        value={formData.title} onChange={handleChange}
                        className="w-full p-2 border border-slate-300 rounded-lg" required
                    />
                    <label className="font-semibold mb-1 block">Description</label>
                    <textarea
                        name="description" placeholder="Event Description" rows={3}
                        value={formData.description} onChange={handleChange}
                        className="w-full p-2 border border-slate-300 rounded-lg" required
                    />
                    <label className="font-semibold mb-1 block">Date</label>
                    <input
                        type="date" name="date"
                        value={formData.date} onChange={handleChange}
                        className="w-full p-2 border border-slate-300 rounded-lg" required
                    />
                    <label className="font-semibold mb-1 block">Venue</label>
                    <input
                        type="text" name="venue" placeholder="Event Venue"
                        value={formData.venue} onChange={handleChange}
                        className="w-full p-2 border border-slate-300 rounded-lg" required
                    />
                    <label className="font-semibold mb-1 block">Upload Image</label>
                    <input
                        type="file" accept="image/*"
                        onChange={handleImageChange}
                        className="w-full p-2 border border-slate-300 rounded-lg"
                    />
                    {preview && <img src={preview} alt="Preview" className="mt-3 w-full rounded-lg" />}
                    <br /><br />
                    <button type="submit" disabled={loading}
                        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
                        {loading ? "Adding..." : "Add Event"}
                    </button>
                </form>
            </div>
        </div>
    );
}
