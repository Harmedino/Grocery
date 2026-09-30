// Everything a shop owner would want to change lives here.
export const STORE = {
  name: "Natural Mart",
  tagline: "Fresh food and groceries, delivered to your door.",
  city: "Lagos",
  phoneDisplay: "0800 123 4567",
  phoneLink: "+2348001234567",
  whatsapp: "2348001234567", // international format, digits only
  email: "hello@naturalmart.ng",
  address: "12 Market Road, Ikeja, Lagos",
  hours: "Monday to Saturday, 8am to 8pm",
  deliveryPromise: "Same-day delivery when you order before 2pm",
};

// Real photos. Put the files in client/public/images/photos and set the paths,
// e.g. hero: "/images/photos/hero.jpg". Any slot left empty shows an illustration.
export const PHOTOS = {
  hero: "", // a customer with her groceries, or the shop itself
  payOnDelivery: "", // a customer paying the delivery rider at her door
  stepChoose: "", // someone ordering on their phone
  stepPack: "", // staff packing an order
  stepDeliver: "", // the delivery rider on the way
  stepPay: "", // paying at the door
  shop: "", // the shop front or inside (About page)
};

export const CURRENCY = "₦";

// Keep in sync with server/configs/pricing.js
export const DELIVERY_FEE = 1500;
export const FREE_DELIVERY_FROM = 20000;

export const deliveryFeeFor = (subtotal) =>
  subtotal === 0 || subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
