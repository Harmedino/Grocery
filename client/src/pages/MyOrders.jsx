import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Check, Phone } from "lucide-react";
import toast from "react-hot-toast";
import { useAppContext } from "../contex/AppContex";
import { STORE } from "../config/store";
import { formatPrice, phoneLink, whatsappLink } from "../utils/format";
import WhatsAppIcon from "../components/WhatsAppIcon";

const TRACK = ["Order Placed", "Packing", "Out for delivery", "Delivered"];
const LABELS = { "Order Placed": "Placed", Packing: "Packing", "Out for delivery": "On the way", Delivered: "Delivered" };

const Tracker = ({ status }) => {
  if (status === "Cancelled") {
    return <p className="rounded-2xl bg-primary-soft px-4 py-3 font-bold text-primary-dull">This order was cancelled.</p>;
  }
  const reached = Math.max(0, TRACK.indexOf(status));
  return (
    <ol className="grid grid-cols-4 gap-1" aria-label={`Order status: ${status}`}>
      {TRACK.map((step, i) => (
        <li key={step} className="flex flex-col items-center gap-1.5 text-center">
          <div className="flex w-full items-center">
            <span className={`h-1 flex-1 ${i === 0 ? "invisible" : i <= reached ? "bg-accent" : "bg-line"}`} />
            <span className={`grid size-9 shrink-0 place-items-center rounded-full font-extrabold ${i <= reached ? "border-2 border-ink bg-sun text-ink" : "bg-line text-muted"}`}>
              {i < reached || status === "Delivered" ? <Check className="size-5" strokeWidth={3} aria-hidden="true" /> : i + 1}
            </span>
            <span className={`h-1 flex-1 ${i === TRACK.length - 1 ? "invisible" : i < reached ? "bg-accent" : "bg-line"}`} />
          </div>
          <span className={`text-sm font-bold ${i <= reached ? "text-ink" : "text-muted"}`}>{LABELS[step]}</span>
        </li>
      ))}
    </ol>
  );
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { axios, user, setShowUserLogin } = useAppContext();
  const [params] = useSearchParams();
  const justPlaced = params.get("placed") === "1";

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      try {
        const { data } = await axios.get("/api/order/user");
        if (data.success) setOrders(data.orders);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user, axios]);

  if (!user) {
    return (
      <div className="card-pop mx-auto mt-10 max-w-xl px-6 py-14 text-center">
        <img src="/images/scenes/package.webp" alt="" className="mx-auto size-24" />
        <h1 className="mt-6 text-3xl font-extrabold">See your orders</h1>
        <p className="mt-2 text-lg text-muted">Sign in to see what you ordered and where it is.</p>
        <button type="button" onClick={() => setShowUserLogin(true)} className="btn btn-sun mt-8 h-14 px-8 text-lg">
          Sign in
        </button>
      </div>
    );
  }

  return (
    <div className="pt-6 md:pt-10">
      {justPlaced && (
        <div className="card-pop mb-6 flex flex-col items-center gap-4 bg-sun-soft p-6 text-center sm:flex-row sm:text-left">
          <img src="/images/scenes/party.webp" alt="" className="size-20" />
          <div>
            <h2 className="text-2xl font-extrabold text-primary-deep">Thank you! Your order has been placed.</h2>
            <p className="mt-1 text-lg">We will call you to confirm, then bring it to your door. Pay when it arrives.</p>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">My orders</h1>

      {loading ? (
        <div className="card-pop mt-6 h-64 animate-pulse" />
      ) : orders.length === 0 ? (
        <div className="card-pop mt-6 px-6 py-14 text-center">
          <img src="/images/scenes/package.webp" alt="" className="mx-auto size-24" />
          <h2 className="mt-6 text-2xl font-extrabold">No orders yet</h2>
          <p className="mt-2 text-lg text-muted">When you place an order, you can follow it here.</p>
          <Link to="/products" className="btn btn-sun mt-8 h-14 px-8 text-lg">Start shopping</Link>
        </div>
      ) : (
        <ul className="mt-6 space-y-6">
          {orders.map((order) => (
            <li key={order._id} className="card-pop overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-canvas/60 px-5 py-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-muted">Order #{order._id.slice(-6).toUpperCase()}</p>
                  <p className="font-bold">
                    {new Date(order.createdAt).toLocaleDateString("en-NG", { weekday: "long", day: "numeric", month: "long" })}
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 font-bold ${order.isPaid ? "bg-accent-soft text-accent" : "bg-sun-soft text-ink"}`}>
                  {order.isPaid ? "Paid" : order.paymentType === "COD" ? "Pay on delivery" : "Awaiting payment"}
                </span>
              </div>

              <div className="p-5">
                <Tracker status={order.status} />

                <ul className="mt-6 divide-y divide-line">
                  {order.items.map((item, i) => (
                    <li key={item._id || i} className="flex items-center gap-4 py-3">
                      {item.product ? (
                        <>
                          <img src={item.product.images?.[0]} alt="" className="size-14 shrink-0 rounded-2xl bg-canvas object-contain p-1.5" />
                          <div className="min-w-0 flex-1">
                            <p className="font-bold">{item.product.name}</p>
                            <p className="text-muted">{item.product.unit} · Quantity {item.quantity}</p>
                          </div>
                          <p className="font-bold">{formatPrice(item.product.offerPrice * item.quantity)}</p>
                        </>
                      ) : (
                        <p className="text-muted">An item that is no longer in our shop · Quantity {item.quantity}</p>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="mt-2 space-y-1 border-t border-line pt-4 text-lg">
                  {order.deliveryFee > 0 && (
                    <p className="flex justify-between text-muted"><span>Delivery</span><span>{formatPrice(order.deliveryFee)}</span></p>
                  )}
                  <p className="flex justify-between text-xl font-extrabold"><span>Total</span><span>{formatPrice(order.amount)}</span></p>
                </div>

                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <a href={phoneLink()} className="btn btn-white h-12 px-4">
                    <Phone className="size-5" aria-hidden="true" /> Call about this order
                  </a>
                  <a
                    href={whatsappLink(`Hello ${STORE.name}, I have a question about order #${order._id.slice(-6).toUpperCase()}.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-white h-12 px-4"
                  >
                    <WhatsAppIcon className="size-5 text-[#1ea952]" /> WhatsApp us
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
