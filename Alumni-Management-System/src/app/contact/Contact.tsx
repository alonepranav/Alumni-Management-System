import { useForm, ValidationError } from "@formspree/react";
import { ChangeEvent, FormEvent, useState } from "react";


const Contact = () => {
    const [formData, setFormData] = useState<{ name: string; email: string; message: string }>({
        name: "", email: "", message: ""
    });

    const formspreeApi = import.meta.env.VITE_formspree_api as string;
    const [state, handleSubmit] = useForm(formspreeApi);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await handleSubmit(e as FormEvent<HTMLFormElement>);
        if (state.succeeded) {
            alert("Thank you for contacting us!");
            setFormData({ name: "", email: "", message: "" });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white px-6 pb-10 pt-7 rounded-2xl shadow-lg w-[40rem]">
                <h2 className="text-2xl font-bold text-center mb-8">Contact Us</h2>
                {state.succeeded ? (
                    <p className="text-center text-green-600">Thank you for contacting us!</p>
                ) : (
                    <form onSubmit={onSubmit} className="space-y-4">
                        <label className="font-semibold mb-1 block">Name</label>
                        <input type="text" name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-slate-300 rounded-lg"
                            required
                        />
                        <label className="font-semibold mb-1 block mt-3">Email</label>
                        <input type="email" name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border border-slate-300 rounded-lg"
                            required
                        />
                        <ValidationError prefix="Email" field="email" errors={state.errors} />
                        <label className="font-semibold mb-1 block mt-3">Message</label>
                        <textarea name="message" rows={3}
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-2 border border-slate-300 rounded-lg"
                            required
                        />
                        <ValidationError prefix="Message" field="message" errors={state.errors} />
                        <br />
                        <br />
                        <button
                            type="submit"
                            disabled={state.submitting}
                            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                        >
                            {state.submitting ? "Submitting..." : "Submit"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Contact;
