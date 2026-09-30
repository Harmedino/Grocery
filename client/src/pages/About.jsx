import { Link } from "react-router-dom";
import { STORE } from "../config/store";
import { ShopScene } from "../components/Scenes";
import HelpBanner from "../components/HelpBanner";

const values = [
  { image: "seedling", title: "Fresh first", text: "We buy fresh produce often and pick every item by hand, the way you would at the market." },
  { image: "green-heart", title: "Fair prices", text: "Clear prices with no surprises. What you see is what you pay, plus delivery if any." },
  { image: "telephone", title: "Real people", text: "Call or WhatsApp us and a real person from the shop will answer and help." },
];

const About = () => (
  <div className="space-y-14 pt-6 md:pt-10">
    <section className="grid items-center gap-8 rounded-[2rem] bg-white p-6 ring-1 ring-line sm:p-10 lg:grid-cols-2">
      <div>
        <p className="font-extrabold uppercase tracking-widest text-primary">About us</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">Your neighbourhood shop, now at your door</h1>
        <p className="mt-4 text-lg text-muted">
          {STORE.name} is a neighbourhood grocery store in {STORE.city}. Our customers come in for rice, beans, fresh pepper,
          provisions and drinks. Now you can order the same things from home and we will bring them to you.
        </p>
        <p className="mt-4 text-lg text-muted">
          Busy with work, looking after children, or not able to go out easily? Order online, on the phone, or on WhatsApp, and pay when it arrives.
        </p>
        <Link to="/products" className="mt-8 inline-flex h-14 items-center rounded-2xl bg-primary px-8 text-lg font-extrabold text-white hover:bg-primary-dull">
          Start shopping
        </Link>
      </div>
      <ShopScene />
    </section>

    <section className="grid gap-4 md:grid-cols-3">
      {values.map((v) => (
        <div key={v.title} className="rounded-3xl bg-white p-6 ring-1 ring-line">
          <img src={`/images/scenes/${v.image}.webp`} alt="" className="size-16" />
          <h2 className="mt-4 text-2xl font-extrabold">{v.title}</h2>
          <p className="mt-2 text-lg text-muted">{v.text}</p>
        </div>
      ))}
    </section>

    <HelpBanner />
  </div>
);

export default About;
