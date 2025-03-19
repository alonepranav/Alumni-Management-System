const galleryImages = [
    { src: "/google.png", desc: "Alumni Meet 2024 - A memorable gathering" },
    { src: "/google.png", desc: "Students collaborating on a project" },
    { src: "/google.png", desc: "Tech Workshop organized by MCA students" },
    { src: "/google.png", desc: "Coding competition hosted by our department" },
    { src: "/google.png", desc: "Successful Alumni sharing experiences" },
    { src: "/google.png", desc: "Annual MCA batch photograph" }
];

export default function Gallery() {
    return (
        <div className="min-h-screen pt-20 pb-28 px-6">
            <div className="max-w-6xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-blue-500 mb-6">Gallery</h1>
                <p className="text-lg text-gray-700 mb-10">
                    A collection of our best moments, achievements, and memories.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {galleryImages.map((image, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden border border-slate-200">
                            <div className="overflow-hidden h-60">
                                <img src={image.src} alt={`Image ${index + 1}`} className="w-full h-60 object-cover hover:scale-110 transition-all" />
                            </div>
                            <div className="p-4">
                                <p className="text-gray-800 text-center font-medium">{image.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
