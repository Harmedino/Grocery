import { CURRENCY, STORE } from "../config/store";

const numberFormat = new Intl.NumberFormat("en-NG", { maximumFractionDigits: 2 });

export const formatPrice = (amount) => `${CURRENCY}${numberFormat.format(Number(amount) || 0)}`;

export const discountPercent = (product) =>
  product.price > product.offerPrice ? Math.round((1 - product.offerPrice / product.price) * 100) : 0;

export const productUrl = (product) => `/products/${product.category.toLowerCase()}/${product._id}`;

export const whatsappLink = (text) =>
  `https://wa.me/${STORE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const phoneLink = () => `tel:${STORE.phoneLink}`;
