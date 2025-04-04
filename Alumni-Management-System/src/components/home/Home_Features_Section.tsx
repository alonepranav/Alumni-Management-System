export default function Home_Features_Section() {
    return (
        <>
            <div className="py-16 px-6 max-w-4xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">Connecting Alumni & Students</h2>
                <p className="text-gray-600">
                    Our system helps alumni stay connected, share experiences, and mentor students for a brighter future.
                </p>
            </div>
            <div className="flex justify-center items-center gap-10 flex-wrap">
                <div className="bg-white p-6 w-80 rounded-lg text-center border border-slate-300 hover:shadow-2xl hover:shadow-gray-300">
                    <img src="/home/n.jpg" alt="Networking" className="border-slate-100 border w-full h-40 object-cover rounded-md" />
                    <h3 className="text-xl font-semibold mt-4">Networking</h3>
                    <p className="text-gray-600 mt-2">Connect with alumni and expand your professional network.</p>
                </div>

                <div className="bg-white p-6 w-80 rounded-lg text-center border border-slate-300 hover:shadow-2xl hover:shadow-gray-300">
                    <img src="/home/m.jpg" alt="Mentorship" className="border-slate-100 border w-full h-40 object-cover rounded-md" />
                    <h3 className="text-xl font-semibold mt-4">Mentorship</h3>
                    <p className="text-gray-600 mt-2">Alumni can guide students in career growth and skill development.</p>
                </div>

                <div className="bg-white p-6 w-80 rounded-lg text-center border border-slate-300 hover:shadow-2xl hover:shadow-gray-300">
                    <img src="/home/r.jpg" alt="Events" className="border-slate-100 border w-full h-40 object-cover rounded-md" />
                    <h3 className="text-xl font-semibold mt-4">Events & Reunions</h3>
                    <p className="text-gray-600 mt-2">Stay updated with alumni meetups and career events.</p>
                </div>
            </div>
        </>
    )
}
