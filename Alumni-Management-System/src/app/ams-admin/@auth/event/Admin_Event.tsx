import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { appDatabase } from "../../../../firebase/firebase";
import Loader from "../../../../components/Loader";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";


type EventType = { id: string; title: string; description: string; date: string; imageUrl: string; venue: string };

export default function Admin_Events() {
    const [events, setEvents] = useState<EventType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(appDatabase, "events"));
            const eventData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EventType));
            setEvents(eventData);
        } catch (error) {
            console.error("Error fetching events:", error);
            toast.error("Failed to fetch events.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (eventId: string) => {
        if (!confirm("Are you sure you want to delete this event?")) return;

        try {
            await deleteDoc(doc(appDatabase, "events", eventId));
            setEvents(events.filter(event => event.id !== eventId));
            toast.success("Event deleted successfully.");
        } catch (error) {
            console.error("Error deleting event:", error);
            toast.error("Failed to delete event.");
        }
    };

    return (
        <div className="min-h-screen w-screen py-24 px-20">
            <Toaster />
            <h2 className="text-3xl font-medium text-center mb-10">Manage Events</h2>

            {loading && (
                <div className="flex justify-center items-center gap-3 my-20">
                    <Loader size="30px" />
                    <p className="text-xl font-semibold">Getting events ...</p>
                </div>
            )}

            <div className="flex flex-wrap gap-6 items-start flex-col px-60">
                {[...events].reverse().map((event, i) => <EventBox key={i} event={event} />)}
            </div>
        </div>
    );

    function EventBox({ event }: { event: EventType }) {
        const [toggle, settoggle] = useState(false);

        return <div key={event.id} className="border border-gray-300 p-4 rounded-lg shadow-md w-full">
            <h3 className="text-xl cursor-pointer font-semibold mt-3" onClick={() => settoggle(!toggle)}>{event.title}</h3>
            {
                toggle ?
                    <div className="">
                        {event.imageUrl && (
                            <img src={event.imageUrl} alt={event.title} className="w-full h-96 object-contain rounded-md" />
                        )}
                        <p className="text-gray-600" >{event.description}</p>
                        <div className="flex gap-3">
                            <p className="text-gray-500 text-lg mt-2 border border-slate-400 rounded-md p-2 w-fit">
                                Event Date: {new Date(event.date).toDateString()}
                            </p>
                            <p className="text-gray-500 text-lg mt-2 border border-slate-400 rounded-md p-2 w-fit">
                                Venue: {event.venue}
                            </p>
                        </div>
                    </div> : null
            }
            <button
                onClick={() => handleDelete(event.id)}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
                Delete Event
            </button>
        </div>
    }
}
