export default function AboutUs() {

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-24 w-full">
            <div className="bg-white shadow-lg rounded-lg px-8 py-10 max-w-6xl text-center">
                <h1 className="text-4xl font-bold text-blue-500 mb-6">About Us</h1>

                <p className="text-gray-700 text-lg">
                    We are MCA students of PIBM, working hard to build and solve tomorrow's challenges.
                </p>

                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-blue-500">Our Main Goal</h2>
                    <p className="text-gray-700 mt-3">
                        Keeping all MCA students connected, including our alumni, so we can organize annual Alumni Meets.
                        This will help us stay in touch, learn from our seniors, and grow together.
                        We aim to continuously improve in the field while maintaining the reputation of our MCA branch.
                    </p>
                </div>

                <div className="mt-10">
                    <h2 className="text-2xl font-semibold text-blue-500">Our Contributors</h2>
                    <p className="text-gray-700 mt-2">
                        Thanks to the students who have dedicated their time and effort to make this platform possible.
                    </p>

                    <br />
                    <div className="mt-6">
                        <h3 className="text-xl font-medium text-gray-800">Frontend & Backend</h3>
                        <br />
                        <div className="flex justify-center gap-6 mt-6">
                            {["Pranav", "Star", "Dark", "Aqua"].map((name, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <img
                                        src={`/google.png`}
                                        alt={name}
                                        className="w-20 h-20 rounded-full object-cover border-2 border-cyan-400"
                                    />
                                    <p className="mt-5 font-medium text-gray-800">{name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
