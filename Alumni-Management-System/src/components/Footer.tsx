import { Link } from "react-router-dom";


export default function Footer() {
    return (
        <footer className="bg-slate-50 text-gray-800 py-10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-semibold mb-4">About Us</h3>
                    <p className="text-sm">We are MCA students of PIBM, striving to build a strong community that connects students and alumni.</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                    <ul className="flex flex-col gap-2">
                        <Link to="/" className="w-fit hover:text-blue-600 font-semibold">🏠 Home</Link>
                        <Link to="/about" className="w-fit hover:text-blue-600 font-semibold">ℹ️ About Us</Link>
                        <Link to="/contact" className="w-fit hover:text-blue-600 font-semibold">📞 Contact</Link>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-4">Resources</h3>
                    <ul className="flex flex-col gap-2">
                        <Link to="/events" className="w-fit hover:text-blue-600 font-semibold">📅 Events</Link>
                        <Link to="/posts" className="w-fit hover:text-blue-600 font-semibold">📝 Blogs</Link>
                        <Link to="/gallery" className="w-fit hover:text-blue-600 font-semibold">🖼️ Gallery</Link>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-4">Contact</h3>
                    <ul className="space-y-2">
                        <li>📧 Email: <a href="mailto:info@kes.org.in" className="w-fit hover:text-blue-600 font-semibold">info@kes.org.in</a></li>
                        <li>📱 Phone: <a href="tel:+918600100945" className="w-fit hover:text-blue-600 font-semibold">+91 8600100945</a></li>
                        <li>📍 Address: <span className="font-semibold">PIBM, India</span></li>
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
