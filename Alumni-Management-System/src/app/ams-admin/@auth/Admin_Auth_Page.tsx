import { Link } from "react-router-dom";

export default function Admin_Auth_Page() {

    return (
        <div className="py-20 px-96 min-h-screen w-screen">
            <div className="flex gap-10 mt-10 flex-col">
                <div className="">
                    <p className="font-semibold text-lg mb-3">Gallery</p>
                    <div className="flex gap-7">
                        <Link to={"gallery"} className="block w-fit px-6 py-2 bg-blue-400 rounded-md text-white font-semibold text-lg">
                            Image Gallery
                        </Link>
                        <Link to={"gallery/add"} className="block w-fit px-6 py-2 bg-blue-400 rounded-md text-white font-semibold text-lg">
                            Add new Images to Gallery
                        </Link>
                    </div>
                </div>
                <div className="">
                    <p className="font-semibold text-lg mb-3">Event</p>
                    <div className="flex gap-7">
                        <Link to={"event"} className="block w-fit px-6 py-2 bg-amber-400 rounded-md text-white font-semibold text-lg">
                            All Events
                        </Link>
                        <Link to={"event/add-event"} className="block w-fit px-6 py-2 bg-amber-400 rounded-md text-white font-semibold text-lg">
                            Add new Event
                        </Link>
                    </div>
                </div>
                <div className="">
                    <p className="font-semibold text-lg mb-3">Other</p>
                    <div className="flex gap-7">
                        <button onClick={() => {
                            localStorage.clear();
                            location.replace("/");
                        }} className="block w-fit px-6 py-2 bg-rose-400 cursor-pointer rounded-md text-white font-semibold text-lg">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
