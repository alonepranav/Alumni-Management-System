import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { appDatabase } from "../../firebase/firebase";
import Loader from "../../components/Loader";

type EventType = { id: string; title: string; description: string; date: string; imageUrl: string, venue: string };

export default function Events() {
    const [events, setEvents] = useState<EventType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const querySnapshot = await getDocs(collection(appDatabase, "events"));
                const eventData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EventType));
                setEvents(eventData);
            } catch (error) { } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="min-h-screen w-screen py-24 px-20">
            <h2 className="text-3xl font-medium text-center mb-10">Upcoming Events</h2>

            {
                loading && <div className="flex justify-center items-center gap-3 my-20">
                    <Loader size="30px" />
                    <p className="text-xl font-semibold">Getting posts ...</p>
                </div>
            }
            <div className="flex flex-wrap gap-6 items-start flex-col px-60">
                {[...events].reverse().map((event, i) => <EventBox event={event} key={i} />)}
            </div>
        </div>
    );
}

const EventBox = ({ event }: { event: EventType }) => {
    // const [toggle, setToggle] = useState(false);

    return <div key={event.id} className="border border-gray-300 p-4 rounded-lg shadow-md w-full">
        {
            event.imageUrl ?
                <img src={event.imageUrl} alt={event.title} className="w-full h-96 object-contain rounded-md" />
                : null
        }
        <h3 className="text-xl font-semibold mt-3">{event.title}</h3>

        <p className="text-gray-600">{event.description}</p>

        <div className="flex gap-3">
            <p className="text-gray-500 text-lg mt-2 border border-slate-400 rounded-md p-2 w-fit">Event Date : {new Date(event.date).toDateString()}</p>
            <p className="text-gray-500 text-lg mt-2 border border-slate-400 rounded-md p-2 w-fit">Venue : {event.venue}</p>
        </div>
    </div>
}