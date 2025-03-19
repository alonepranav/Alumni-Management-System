import { ChangeEvent, FormEvent, useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted", formData);
        alert("Thank you for contacting us!");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white px-6 pb-10 pt-7 rounded-2xl shadow-lg w-[40rem]">
                <h2 className="text-2xl font-bold text-center mb-8">Contact Us</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="font-semibold mb-1 block">Name</label>
                    <input
                        type="text" name="name" placeholder="Your Name"
                        value={formData.name} onChange={handleChange}
                        className="w-full p-2 border border-slate-300 rounded-lg"
                        required
                    />
                    <label className="font-semibold mb-1 block mt-3">Email</label>
                    <input
                        type="email" name="email" placeholder="Your Email"
                        value={formData.email} onChange={handleChange}
                        className="w-full p-2 border border-slate-300 rounded-lg"
                        required
                    />
                    <label className="font-semibold mb-1 block mt-3">Message</label>
                    <textarea
                        name="message" placeholder="Your Message" rows={3}
                        value={formData.message} onChange={handleChange}
                        className="w-full p-2 border border-slate-300 rounded-lg"
                        required
                    />
                    <br />
                    <br />
                    <button type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};


export default Contact;