import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CreditCard, MapPin, Plus, Trash, Wallet } from "lucide-react";
import toast from "react-hot-toast";
import { useAppContext } from "../contex/AppContex";
import { FREE_DELIVERY_FROM, STORE, deliveryFeeFor } from "../config/store";
import { categoryTint } from "../config/categories";
import { formatPrice, productUrl, whatsappLink } from "../utils/format";
import QuantityStepper from "../components/QuantityStepper";
import WhatsAppIcon from "../components/WhatsAppIcon";

const StepTitle = ({ n, children }) => (
  <h2 className="flex items-center gap-3 text-xl font-extrabold">
    <span className="grid size-9 place-items-center rounded-full text-base border-2 border-ink bg-sun text-ink">{n}</span>
    {children}
  </h2>
);

const formatAddress = (a) => [a.street, a.city, a.state].filter(Boolean).join(", ");

const Cart = () => {
  const { axios, cartLines, getCartCount, getCartTotalAmount, updateCartItems, navigate, user, setShowUserLogin, setCartItems, productsLoading } =
    useAppContext();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");
  const [placing, setPlacing] = useState(false);

  const subtotal = getCartTotalAmount();
  const deliveryFee = deliveryFeeFor(subtotal);
  const total = subtotal + deliveryFee;
  const toFreeDelivery = Math.max(0, FREE_DELIVERY_FROM - subtotal);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      try {
        const { data } = await axios.get("/api/address/get");
        if (data.success) {
          setAddresses(data.addressses);
          setSelectedAddress((current) => current || data.addressses[0] || null);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    load();
  }, [user, axios]);

  const placeOrder = async () => {
    if (!user) return setShowUserLogin(true);
    if (!selectedAddress) return toast.error("Please add a delivery address first");

    setPlacing(true);
    const payload = {
      address: selectedAddress._id,
      items: cartLines.map(({ product, quantity }) => ({ product: product._id, quantity })),
    };
    try {
      if (paymentOption === "COD") {
        const { data } = await axios.post("/api/order/cod", payload);
        if (data.success) {
          setCartItems({});
          navigate("/my-orders?placed=1");
          scrollTo(0, 0);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post("/api/order/stripe", payload);
        if (data.success) {
          window.location.replace(data.url);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setPlacing(false);
    }
  };

  const whatsappOrder = () => {
    const lines = cartLines.map(
      ({ product, quantity }) => `• ${quantity} x ${product.name}${product.unit ? ` (${product.unit})` : ""} = ${formatPrice(product.offerPrice * quantity)}`
    );
    const text = [
      `Hello ${STORE.name}, I would like to order:`,
      ...lines,
      "",
      `Items: ${formatPrice(subtotal)}`,
      `Delivery: ${deliveryFee ? formatPrice(deliveryFee) : "Free"}`,
      `Total: ${formatPrice(total)}`,
      "",
      selectedAddress ? `Deliver to: ${formatAddress(selectedAddress)}` : "Deliver to: (I will send my address)",
    ].join("\n");
    return whatsappLink(text);
  };

  if (productsLoading) {
    return <div className="card-pop mt-10 h-96 animate-pulse" />;
  }

  if (cartLines.length === 0) {
    return (
      <div className="card-pop mx-auto mt-10 max-w-xl px-6 py-14 text-center">
        <img src="/images/scenes/cart.webp" alt="" className="mx-auto size-28" />
        <h1 className="mt-6 text-3xl font-extrabold">Your basket is empty</h1>
        <p className="mt-2 text-lg text-muted">Tap “Add to basket” on anything you want, and it will show here.</p>
        <Link to="/products" className="btn btn-sun mt-8 h-14 px-8 text-lg">
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-6 md:pt-10">
      <Link to="/products" className="inline-flex min-h-12 items-center gap-2 font-bold text-primary">
        <ArrowLeft className="size-5" aria-hidden="true" /> Continue shopping
      </Link>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Your basket <span className="text-xl font-bold text-muted">({getCartCount()} items)</span>
      </h1>

      {/* minmax(0, …) stops long content from widening the page on small phones */}
      <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
        {/* Items */}
        <section aria-label="Items in your basket" className="space-y-4">
          <div className="card-pop p-4">
            {toFreeDelivery > 0 ? (
              <p className="font-bold">
                Add <span className="text-primary">{formatPrice(toFreeDelivery)}</span> more to get <span className="text-primary">free delivery</span>
              </p>
            ) : (
              <p className="font-bold text-accent">🎉 You get free delivery on this order</p>
            )}
            <div className="mt-3 h-4 overflow-hidden rounded-full border-2 border-ink bg-white">
              <div className="h-full rounded-full bg-sun transition-all" style={{ width: `${Math.min(100, (subtotal / FREE_DELIVERY_FROM) * 100)}%` }} />
            </div>
          </div>

          <ul className="card-pop divide-y divide-line overflow-hidden">
            {cartLines.map(({ product, quantity }) => (
              <li key={product._id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
                <div className="flex min-w-0 flex-1 gap-4">
                  <Link to={productUrl(product)} className="grid size-20 shrink-0 place-items-center rounded-2xl border-2 border-ink sm:size-24" style={{ backgroundColor: categoryTint(product.category) }}>
                    <img src={product.images?.[0]} alt="" className="size-[70%] object-contain mix-blend-multiply" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link to={productUrl(product)} className="text-lg font-extrabold leading-snug hover:text-primary">{product.name}</Link>
                    <p className="text-muted">{product.unit} · {formatPrice(product.offerPrice)} each</p>
                    <p className="mt-1 text-xl font-extrabold">{formatPrice(product.offerPrice * quantity)}</p>
                  </div>
                </div>
                {/* Own row on phones so nothing is squeezed off the screen */}
                <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
                  <div className="w-40">
                    <QuantityStepper product={product} />
                  </div>
                  <button
                    type="button"
                    onClick={() => updateCartItems(product._id, 0)}
                    className="flex h-12 items-center gap-1.5 rounded-full px-3 font-extrabold text-primary hover:bg-primary-soft"
                  >
                    <Trash className="size-5" aria-hidden="true" /> Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Checkout */}
        <aside className="space-y-4 lg:sticky lg:top-44">
          <section className="card-pop p-5">
            <StepTitle n={1}>Where should we deliver?</StepTitle>
            {!user ? (
              <div className="mt-4">
                <p className="text-muted">Sign in or create an account so we know where to bring your order.</p>
                <button type="button" onClick={() => setShowUserLogin(true)} className="btn btn-sun mt-3 h-12 w-full">
                  Sign in to continue
                </button>
              </div>
            ) : addresses.length === 0 ? (
              <Link to="/add-address" className="mt-4 flex h-14 items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-ink/50 font-extrabold text-ink hover:bg-sun-soft">
                <Plus className="size-5" aria-hidden="true" /> Add delivery address
              </Link>
            ) : (
              <fieldset className="mt-4 space-y-2">
                <legend className="sr-only">Delivery address</legend>
                {addresses.map((a) => (
                  <label
                    key={a._id}
                    className={`flex cursor-pointer gap-3 rounded-2xl border-2 p-3 ${selectedAddress?._id === a._id ? "border-ink bg-sun-soft" : "border-line"}`}
                  >
                    <input type="radio" name="address" className="mt-1 size-5 accent-[#c9381a]" checked={selectedAddress?._id === a._id} onChange={() => setSelectedAddress(a)} />
                    <span>
                      <span className="flex items-center gap-1.5 font-bold"><MapPin className="size-4" aria-hidden="true" /> {a.firstName} {a.lastName}</span>
                      <span className="block text-muted">{formatAddress(a)}</span>
                      <span className="block text-muted">{a.phone}</span>
                    </span>
                  </label>
                ))}
                <Link to="/add-address" className="flex min-h-12 items-center gap-2 font-bold text-primary">
                  <Plus className="size-5" aria-hidden="true" /> Add another address
                </Link>
              </fieldset>
            )}
          </section>

          <section className="card-pop p-5">
            <StepTitle n={2}>How will you pay?</StepTitle>
            <fieldset className="mt-4 space-y-2">
              <legend className="sr-only">Payment method</legend>
              {[
                { value: "COD", Icon: Wallet, title: "Pay on delivery", text: "Cash or bank transfer when your order arrives" },
                { value: "Online", Icon: CreditCard, title: "Pay online now", text: "Pay with your bank card" },
              ].map((option) => (
                <label key={option.value} className={`flex cursor-pointer gap-3 rounded-2xl border-2 p-3 ${paymentOption === option.value ? "border-ink bg-sun-soft" : "border-line"}`}>
                  <input type="radio" name="payment" className="mt-1 size-5 accent-[#c9381a]" checked={paymentOption === option.value} onChange={() => setPaymentOption(option.value)} />
                  <span>
                    <span className="flex items-center gap-1.5 font-bold"><option.Icon className="size-4" aria-hidden="true" /> {option.title}</span>
                    <span className="block text-muted">{option.text}</span>
                  </span>
                </label>
              ))}
            </fieldset>
          </section>

          <section className="card-pop p-5">
            <StepTitle n={3}>Check and place order</StepTitle>
            <dl className="mt-4 space-y-2 text-lg">
              <div className="flex justify-between"><dt className="text-muted">Items</dt><dd className="font-bold">{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between">
                <dt className="text-muted">Delivery</dt>
                <dd className={`font-bold ${deliveryFee ? "" : "text-accent"}`}>{deliveryFee ? formatPrice(deliveryFee) : "Free"}</dd>
              </div>
              <div className="flex justify-between border-t border-line pt-3 text-2xl">
                <dt className="font-extrabold">Total</dt><dd className="font-extrabold">{formatPrice(total)}</dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={placeOrder}
              disabled={placing}
              className="btn btn-red mt-5 h-16 w-full text-xl disabled:opacity-60"
            >
              {placing ? "Placing your order..." : !user ? "Sign in to order" : paymentOption === "COD" ? `Place order · ${formatPrice(total)}` : `Pay ${formatPrice(total)} now`}
            </button>
            <div className="my-4 flex items-center gap-3 text-muted">
              <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
            </div>
            <a
              href={whatsappOrder()}
              target="_blank"
              rel="noreferrer"
              className="btn btn-wa h-14 w-full text-lg"
            >
              <WhatsAppIcon className="size-6" /> Send this order on WhatsApp
            </a>
            <p className="mt-2 text-center text-sm text-muted">No account needed. We will confirm by chat.</p>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
