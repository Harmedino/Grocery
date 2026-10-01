import { Phone } from "lucide-react";
import { STORE } from "../config/store";
import { phoneLink, whatsappLink } from "../utils/format";
import WhatsAppIcon from "./WhatsAppIcon";

const HelpBanner = () => (
  <section className="card-pop shadow-pop relative overflow-hidden bg-primary px-6 py-10 text-white sm:px-10">
    <img src="/images/scenes/telephone.webp" alt="" aria-hidden="true" className="absolute -right-4 -top-4 hidden w-44 rotate-12 md:block" />
    <div className="relative max-w-2xl">
      <h2 className="text-3xl font-extrabold md:text-4xl">Prefer to order by phone?</h2>
      <p className="mt-2 text-lg font-semibold text-white/90">
        Call or send us a WhatsApp message and we will put your order together for you. {STORE.hours}.
      </p>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row">
        <a href={phoneLink()} className="btn btn-white h-14 px-6 text-lg">
          <Phone className="size-6" aria-hidden="true" /> Call {STORE.phoneDisplay}
        </a>
        <a
          href={whatsappLink(`Hello ${STORE.name}, I would like to place an order.`)}
          target="_blank"
          rel="noreferrer"
          className="btn btn-wa h-14 px-6 text-lg"
        >
          <WhatsAppIcon className="size-6" /> Chat on WhatsApp
        </a>
      </div>
    </div>
  </section>
);

export default HelpBanner;
