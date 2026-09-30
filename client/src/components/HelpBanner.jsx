import { Phone } from "lucide-react";
import { STORE } from "../config/store";
import { phoneLink, whatsappLink } from "../utils/format";
import WhatsAppIcon from "./WhatsAppIcon";

const HelpBanner = () => (
  <section className="relative overflow-hidden rounded-3xl bg-primary-deep px-6 py-10 text-white sm:px-10">
    <img src="/images/scenes/telephone.webp" alt="" aria-hidden="true" className="absolute -right-6 -top-6 hidden w-44 opacity-90 md:block" />
    <div className="relative max-w-2xl">
      <h2 className="text-2xl font-extrabold md:text-3xl">Prefer to order by phone?</h2>
      <p className="mt-2 text-lg text-green-100">
        Call or send us a WhatsApp message and we will put your order together for you. {STORE.hours}.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a href={phoneLink()} className="flex h-14 items-center justify-center gap-3 rounded-2xl bg-white px-6 text-lg font-extrabold text-primary-deep hover:bg-green-50">
          <Phone className="size-6" aria-hidden="true" /> Call {STORE.phoneDisplay}
        </a>
        <a
          href={whatsappLink(`Hello ${STORE.name}, I would like to place an order.`)}
          target="_blank"
          rel="noreferrer"
          className="flex h-14 items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 text-lg font-extrabold text-[#08361c] hover:brightness-95"
        >
          <WhatsAppIcon className="size-6" /> Chat on WhatsApp
        </a>
      </div>
    </div>
  </section>
);

export default HelpBanner;
