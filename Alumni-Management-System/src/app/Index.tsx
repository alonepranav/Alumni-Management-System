import Memories from "../components/Memories";


export default function Index() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="h-[70vh] w-full bg-cover bg-center flex items-center justify-center relative"
                style={{ backgroundImage: "url('/all.jpeg')" }}
            >
                {/* <div className="absolute inset-0 bg-gradient-to-b from-red-500/50 to-blue-500/50"></div> */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/80"></div>

                <div className="relative z-10 text-white">
                    <p className="text-5xl font-semibold">Welcome to Alumni Management System</p>
                    <p className="text-center mt-7 text-2xl font-medium">Linking Yesterday's Students with Tomorrow's Leaders.</p>
                </div>
            </div>


            {/* About Section */}
            <div className="py-16 px-6 max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-semibold mb-4">Connecting Alumni & Students</h2>
                <p className="text-gray-600">
                    Our system helps alumni stay connected, share experiences, and mentor students for a brighter future.
                </p>
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 max-w-5xl mx-auto">
                {/* Feature 1 */}
                <div className="bg-white shadow-lg p-6 rounded-lg text-center border border-slate-300 hover:shadow-2xl">
                    <img src="/home/n.jpg" alt="Networking" className="w-full h-40 object-cover rounded-md" />
                    <h3 className="text-xl font-semibold mt-4">Networking</h3>
                    <p className="text-gray-600">Connect with alumni and expand your professional network.</p>
                </div>

                {/* Feature 2 */}
                <div className="bg-white shadow-lg p-6 rounded-lg text-center border border-slate-300 hover:shadow-2xl">
                    <img src="/home/m.jpg" alt="Mentorship" className="w-full h-40 object-cover rounded-md" />
                    <h3 className="text-xl font-semibold mt-4">Mentorship</h3>
                    <p className="text-gray-600">Alumni can guide students in career growth and skill development.</p>
                </div>

                {/* Feature 3 */}
                <div className="bg-white shadow-lg p-6 rounded-lg text-center border border-slate-300 hover:shadow-2xl">
                    <img src="/home/r.jpg" alt="Events" className="w-full h-40 object-cover rounded-md" />
                    <h3 className="text-xl font-semibold mt-4">Events & Reunions</h3>
                    <p className="text-gray-600">Stay updated with alumni meetups and career events.</p>
                </div>
            </div>

            <Memories />

        </div>
    );
}
