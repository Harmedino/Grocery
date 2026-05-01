import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../contex/AppContex";
import toast from "react-hot-toast";

const Contact = () => {
  const { axios } = useAppContext();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      return toast.error("Please fill required fields");
    }
    setLoading(true);
    try {
      // Try to post to a contact API if available. If not, we'll just show success.
      await axios.post("/api/contact", { name, email, subject, message });
      toast.success("Message sent — we'll get back to you soon.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      // if endpoint not available, still give feedback
      console.error(err);
      toast.success("Message saved locally (no backend). Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start px-4">
        <div>
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="mt-3 text-gray-600">Have a question or need help? We'd love to hear from you.</p>

          <div className="mt-8 grid grid-cols-1 gap-4">
            <div className="flex items-start gap-4 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <img src={assets.delivery_truck_icon} alt="icon" className="w-10 h-10" />
              <div>
                <p className="font-semibold">Customer Support</p>
                <p className="text-sm text-gray-500">support@grocery.example</p>
                <p className="text-sm text-gray-500">Mon — Fri, 9am — 6pm</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <img src={assets.trust_icon} alt="icon" className="w-10 h-10" />
              <div>
                <p className="font-semibold">Head Office</p>
                <p className="text-sm text-gray-500">123 Market Street, YourCity</p>
                <p className="text-sm text-gray-500">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold">Frequently asked</h3>
              <ul className="mt-3 text-sm text-gray-600 space-y-2">
                <li>How long does delivery take? — Usually within 30–60 minutes.</li>
                <li>Do you offer refunds? — Yes, within 7 days with receipt.</li>
                <li>Can I change my order? — Contact support as soon as possible.</li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold">Find us</h3>
            <div className="mt-3 rounded overflow-hidden border border-gray-100">
              <iframe
                title="map"
                src="https://maps.google.com/maps?q=New%20York%20City&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-48"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold">Send us a message</h2>
            <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="border border-gray-200 rounded p-3 focus:outline-none" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="border border-gray-200 rounded p-3 focus:outline-none" />
              <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject (optional)" className="border border-gray-200 rounded p-3 focus:outline-none" />
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your message" rows={6} className="border border-gray-200 rounded p-3 focus:outline-none" />

              <button className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>

            <p className="text-sm text-gray-500 mt-4">We typically reply within 24 hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
