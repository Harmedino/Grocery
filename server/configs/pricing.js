// Delivery pricing. Keep in sync with client/src/config/store.js
export const DELIVERY_FEE = 1500;
export const FREE_DELIVERY_FROM = 20000;

export const deliveryFeeFor = (subtotal) => (subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE);
