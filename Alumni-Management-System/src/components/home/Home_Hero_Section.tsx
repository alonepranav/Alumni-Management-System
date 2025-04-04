import { Link } from 'react-router-dom'

export default function Home_Hero_Section() {
    return (
        <div className="h-[60vh] md:h-[70vh] w-full bg-cover bg-center flex items-center justify-center relative mt-16"
            style={{ backgroundImage: "url('/all.jpeg')" }}>
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/60"></div>

            {/*
                <div className="relative z-10 text-white text-center">
                    <p className="text-4xl md:text-5xl font-semibold">Welcome to Alumni Management System</p>
                    <p className="text-center mt-7 text-xl md:text-2xl font-medium">Linking Yesterday's Students with Tomorrow's Leaders.</p>
                </div>
            */}

            <section className="relative text-white py-20 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                        Connect, Network & Grow with Your Alumni
                    </h1>
                    <p className="mt-4 text-lg md:text-xl font-medium">
                        Join our Alumni Management System to stay updated with events, opportunities, and fellow alumni.
                    </p>
                    <div className="mt-10 flex justify-center gap-10 items-center">
                        <Link to="/register" className="bg-white text-blue-600 font-semibold px-7 py-2 text-lg rounded-lg shadow-md hover:bg-gray-200 transition border border-white">
                            Join Now
                        </Link>
                        <Link to="/events" className="border border-white text-white font-semibold px-5 py-2 text-lg rounded-lg shadow-md hover:bg-white hover:text-blue-600 transition" >
                            View Events
                        </Link>
                    </div>
                </div>
            </section>
        </div>


    )
}
