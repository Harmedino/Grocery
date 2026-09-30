import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { FREE_DELIVERY_FROM, DELIVERY_FEE, STORE } from "../config/store";
import { formatPrice } from "../utils/format";
import HelpBanner from "../components/HelpBanner";
import { StepChoose, StepDeliver, StepPack, StepPay } from "../components/Scenes";

const steps = [
  { Scene: StepChoose, title: "Find what you need", text: "Tap a category on the home page, or type what you want in the search box (for example “rice”). Then tap the green “Add to basket” button." },
  { Scene: StepPack, title: "Check your basket", text: "Tap “Basket” at the top of the screen. Use the − and + buttons to change how many you want." },
  { Scene: StepDeliver, title: "Tell us where to deliver", text: "Sign in, add your house address and phone number, then tap “Place order”. We will call you to confirm." },
  { Scene: StepPay, title: "Pay when it arrives", text: "Check your items when the rider arrives, then pay with cash or bank transfer." },
];

const faqs = [
  ["How much is delivery?", `Delivery is ${formatPrice(DELIVERY_FEE)}. It is free when your order is ${formatPrice(FREE_DELIVERY_FROM)} or more.`],
  ["When will my order arrive?", `${STORE.deliveryPromise}. Orders placed later arrive the next morning.`],
  ["Do I have to pay online?", "No. You can pay when your order arrives, with cash or bank transfer. Paying online with a card is also available if you prefer."],
  ["Can I order without using the website?", `Yes. Call us on ${STORE.phoneDisplay} or send a WhatsApp message, and we will put the order together for you.`],
  ["What if something is missing or not fresh?", "Check your items before you pay the rider. If anything is wrong, tell the rider or call us and we will sort it out."],
  ["Can I change or cancel my order?", "Yes, as long as it has not left the shop. Call or WhatsApp us as soon as you can."],
  ["Is my information safe?", "We only use your phone number and address to deliver your order. We never share them."],
];

const Help = () => (
  <div className="space-y-14 pt-6 md:pt-10">
    <section>
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">How to order</h1>
      <p className="mt-2 max-w-2xl text-lg text-muted">Ordering from {STORE.name} takes about two minutes. Here is exactly what to do.</p>
      <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.title} className="rounded-3xl bg-white p-4 ring-1 ring-line">
            <step.Scene />
            <div className="mt-4 flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-lg font-extrabold text-white">{i + 1}</span>
              <h2 className="text-xl font-extrabold leading-tight">{step.title}</h2>
            </div>
            <p className="mt-2 text-lg text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
      <Link to="/products" className="mt-8 inline-flex h-14 items-center rounded-2xl bg-primary px-8 text-lg font-extrabold text-white hover:bg-primary-dull">
        Start shopping
      </Link>
    </section>

    <section id="faq" className="scroll-mt-40">
      <h2 className="text-3xl font-extrabold tracking-tight">Questions & answers</h2>
      <div className="mt-6 divide-y divide-line overflow-hidden rounded-3xl bg-white ring-1 ring-line">
        {faqs.map(([q, a]) => (
          <details key={q} className="group">
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-lg font-extrabold hover:bg-primary-soft [&::-webkit-details-marker]:hidden">
              {q}
              <ChevronDown className="size-6 shrink-0 text-primary transition group-open:rotate-180" aria-hidden="true" />
            </summary>
            <p className="px-5 pb-5 text-lg text-muted">{a}</p>
          </details>
        ))}
      </div>
    </section>

    <HelpBanner />
  </div>
);

export default Help;
