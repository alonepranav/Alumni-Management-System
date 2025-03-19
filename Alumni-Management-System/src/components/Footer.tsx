import { Link } from "react-router-dom";

export default function Footer() {

    return (
        <footer className="bg-slate-50 text-gray-800 py-10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-semibold mb-4">About Us</h3>
                    <p className="text-sm">
                        We are MCA students of PIBM, striving to build a strong community that connects students and alumni.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                    <ul className="flex flex-col gap-2">
                        <Link to="/" className="w-fit hover:text-blue-600">🏠 Home</Link>
                        <Link to="/about" className="w-fit hover:text-blue-600">ℹ️ About Us</Link>
                        <Link to="/contact" className="w-fit hover:text-blue-600">📞 Contact</Link>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4">Resources</h3>
                    <ul className="flex flex-col gap-2">
                        <Link to="/events" className="w-fit hover:text-blue-600">📅 Events</Link>
                        <Link to="/posts" className="w-fit hover:text-blue-600">📝 Blogs</Link>
                        <Link to="/gallery" className="w-fit hover:text-blue-600">🖼️ Gallery</Link>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Contact</h3>
                    <ul className="space-y-2">
                        <li>📧 Email: <a href="mailto:info@igitsarang.ac.in" className="w-fit hover:text-blue-600">info@igitsarang.ac.in</a></li>
                        <li>📱 Phone: <a href="tel:+919876543210" className="w-fit hover:text-blue-600">+91 98765 43210</a></li>
                        <li>📍 Address: IGIT Sarang, Odisha, India</li>
                    </ul>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
                <p>© {new Date().getFullYear()} MCA Alumni Network | All Rights Reserved</p>
            </div>
        </footer>
    );
}
