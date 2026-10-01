import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import toast from "react-hot-toast";
import { useAppContext } from "../contex/AppContex";
import { STORE } from "../config/store";
import { phoneLink, whatsappLink } from "../utils/format";
import Logo from "./Logo";
import WhatsAppIcon from "./WhatsAppIcon";

const columns = [
  {
    title: "Shop",
    links: [
      { text: "All products", to: "/products" },
      { text: "Today's deals", to: "/deals" },
      { text: "All categories", to: "/categories" },
      { text: "My basket", to: "/cart" },
    ],
  },
  {
    title: "Help",
    links: [
      { text: "How to order", to: "/help" },
      { text: "Questions & answers", to: "/help#faq" },
      { text: "My orders", to: "/my-orders" },
      { text: "Contact us", to: "/contact" },
      { text: "About us", to: "/about" },
    ],
  },
];

const Newsletter = () => {
  const { axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const { data } = await axios.post("/api/contact/subscribe", { email });
      if (data.success) {
        toast.success(data.message);
        setEmail("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={submit} className="mt-3 flex flex-col gap-2 sm:flex-row">
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="h-12 min-w-0 flex-1 rounded-2xl border-2 border-sun-soft/40 bg-white/5 px-4 text-white outline-none placeholder:text-sun-soft/60 focus:border-sun"
      />
      <button disabled={sending} className="btn btn-sun h-12 px-5">
        {sending ? "Saving..." : "Get deals"}
      </button>
    </form>
  );
};

const Footer = () => (
  <footer className="mt-16 border-t-2 border-ink bg-ink text-sun-soft">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr] lg:px-8">
      <div>
        <Logo inverted />
        <p className="mt-4 max-w-sm text-sun-soft/85">{STORE.tagline} Order online, by phone or on WhatsApp and pay when it arrives.</p>
        <ul className="mt-5 space-y-2.5">
          <li><a href={phoneLink()} className="flex items-center gap-3 hover:underline"><Phone className="size-5" aria-hidden="true" /> {STORE.phoneDisplay}</a></li>
          <li><a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:underline"><WhatsAppIcon className="size-5" /> WhatsApp us</a></li>
          <li><a href={`mailto:${STORE.email}`} className="flex items-center gap-3 hover:underline"><Mail className="size-5" aria-hidden="true" /> {STORE.email}</a></li>
          <li className="flex items-center gap-3"><MapPin className="size-5 shrink-0" aria-hidden="true" /> {STORE.address}</li>
          <li className="flex items-center gap-3"><Clock className="size-5 shrink-0" aria-hidden="true" /> {STORE.hours}</li>
        </ul>
      </div>

      {columns.map((col) => (
        <div key={col.title}>
          <h3 className="text-xl font-extrabold text-sun">{col.title}</h3>
          <ul className="mt-4 space-y-3">
            {col.links.map((link) => (
              <li key={link.text}>
                <Link to={link.to} className="font-semibold hover:text-sun hover:underline">{link.text}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div>
        <h3 className="text-xl font-extrabold text-sun">Weekly deals by email</h3>
        <p className="mt-2 text-sun-soft/85">One short email a week with our best prices. No spam.</p>
        <Newsletter />
      </div>
    </div>
    <div className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-sm text-sun-soft/80 sm:flex-row sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} {STORE.name}. All rights reserved.</p>
        <Link to="/seller" className="font-semibold hover:underline">Store owner? Sign in here</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
