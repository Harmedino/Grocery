import { useState } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import toast from "react-hot-toast";
import { useAppContext } from "../contex/AppContex";
import { STORE } from "../config/store";
import { phoneLink, whatsappLink } from "../utils/format";
import WhatsAppIcon from "../components/WhatsAppIcon";

const inputClass = "w-full rounded-2xl border-2 border-ink/60 bg-white px-4 text-lg outline-none focus:border-ink focus:ring-4 focus:ring-sun";

const Contact = () => {
  const { axios, user } = useAppContext();
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const set = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const { data } = await axios.post("/api/contact", form);
      if (data.success) {
        toast.success(data.message);
        setForm((f) => ({ ...f, subject: "", message: "" }));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Sorry, your message did not send. Please call or WhatsApp us.");
    } finally {
      setSending(false);
    }
  };

  const ways = [
    { href: phoneLink(), icon: <Phone className="size-7" aria-hidden="true" />, title: "Call us", text: STORE.phoneDisplay, tint: "bg-primary-soft text-primary" },
    { href: whatsappLink(`Hello ${STORE.name}`), icon: <WhatsAppIcon className="size-7" />, title: "WhatsApp", text: "Chat with us", tint: "bg-[#e6f9ee] text-[#1ea952]", external: true },
    { href: `mailto:${STORE.email}`, icon: <Mail className="size-7" aria-hidden="true" />, title: "Email", text: STORE.email, tint: "bg-[#eaf1fb] text-[#2563eb]" },
  ];

  return (
    <div className="pt-6 md:pt-10">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">We are here to help</h1>
      <p className="mt-2 text-lg text-muted">The quickest way to reach us is by phone or WhatsApp. {STORE.hours}.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {ways.map((w) => (
          <a
            key={w.title}
            href={w.href}
            target={w.external ? "_blank" : undefined}
            rel={w.external ? "noreferrer" : undefined}
            className="card-pop flex items-center gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_var(--color-ink)]"
          >
            <span className={`grid size-14 shrink-0 place-items-center rounded-full border-2 border-ink ${w.tint}`}>{w.icon}</span>
            <span>
              <span className="block text-xl font-extrabold">{w.title}</span>
              <span className="block break-all text-muted">{w.text}</span>
            </span>
          </a>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <form onSubmit={onSubmit} className="card-pop space-y-4 p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold">Send us a message</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="c-name" className="mb-1.5 block font-bold">Your name</label>
              <input id="c-name" name="name" value={form.name} onChange={set} required className={`${inputClass} h-14`} />
            </div>
            <div>
              <label htmlFor="c-email" className="mb-1.5 block font-bold">Email</label>
              <input id="c-email" name="email" type="email" value={form.email} onChange={set} required className={`${inputClass} h-14`} />
            </div>
          </div>
          <div>
            <label htmlFor="c-subject" className="mb-1.5 block font-bold">Subject <span className="font-normal text-muted">(optional)</span></label>
            <input id="c-subject" name="subject" value={form.subject} onChange={set} className={`${inputClass} h-14`} />
          </div>
          <div>
            <label htmlFor="c-message" className="mb-1.5 block font-bold">Message</label>
            <textarea id="c-message" name="message" rows={5} value={form.message} onChange={set} required className={`${inputClass} py-3`} />
          </div>
          <button disabled={sending} className="btn btn-sun h-14 w-full text-lg disabled:opacity-60">
            {sending ? "Sending..." : "Send message"}
          </button>
          <p className="text-center text-muted">We usually reply within a few hours.</p>
        </form>

        <div className="space-y-4">
          <div className="card-pop p-6 sm:p-8">
            <h2 className="text-2xl font-extrabold">Visit the shop</h2>
            <p className="mt-3 flex items-start gap-3 text-lg"><MapPin className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" /> {STORE.address}</p>
            <p className="mt-2 flex items-start gap-3 text-lg"><Clock className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" /> {STORE.hours}</p>
          </div>
          <iframe
            title="Map showing the shop"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(STORE.address)}&z=15&output=embed`}
            className="h-72 w-full rounded-[1.75rem] border-2 border-ink"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
