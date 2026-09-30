import { useCallback, useEffect, useMemo, useState } from "react";
import { Phone } from "lucide-react";
import toast from "react-hot-toast";
import { useAppContext } from "../../contex/AppContex";
import { formatPrice } from "../../utils/format";

const STATUSES = ["Order Placed", "Packing", "Out for delivery", "Delivered", "Cancelled"];
const STATUS_STYLE = {
  "Order Placed": "bg-amber-100 text-amber-800",
  Packing: "bg-blue-100 text-blue-800",
  "Out for delivery": "bg-purple-100 text-purple-800",
  Delivered: "bg-primary-soft text-primary-dull",
  Cancelled: "bg-gray-100 text-gray-600",
};

const isToday = (date) => new Date(date).toDateString() === new Date().toDateString();

const Order = () => {
  const { axios } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/order/seller");
      if (data.success) setOrders(data.orders);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [axios]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateStatus = async (orderId, status) => {
    try {
      const { data } = await axios.post("/api/order/status", { orderId, status });
      if (data.success) {
        toast.success(data.message);
        setOrders((list) => list.map((o) => (o._id === orderId ? { ...o, status: data.order.status, isPaid: data.order.isPaid } : o)));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const stats = useMemo(() => {
    const today = orders.filter((o) => isToday(o.createdAt));
    return [
      { label: "Orders today", value: today.length },
      { label: "Sales today", value: formatPrice(today.filter((o) => o.status !== "Cancelled").reduce((sum, o) => sum + o.amount, 0)) },
      { label: "To deliver", value: orders.filter((o) => !["Delivered", "Cancelled"].includes(o.status)).length },
    ];
  }, [orders]);

  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight">Orders</h1>
      <p className="mt-1 text-muted">New orders appear at the top. Update the status as you pack and deliver.</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-white p-5 ring-1 ring-line">
            <p className="font-bold text-muted">{s.label}</p>
            <p className="mt-1 text-3xl font-extrabold">{s.value}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="mt-6 h-48 animate-pulse rounded-2xl bg-white ring-1 ring-line" />
      ) : orders.length === 0 ? (
        <p className="mt-6 rounded-2xl bg-white p-8 text-center text-lg text-muted ring-1 ring-line">No orders yet. They will show here as soon as customers order.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {orders.map((order) => (
            <li key={order._id} className="rounded-2xl bg-white p-5 ring-1 ring-line">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-muted">Order #{order._id.slice(-6).toUpperCase()}</p>
                  <p className="font-bold">{new Date(order.createdAt).toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" })}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-sm font-bold ${STATUS_STYLE[order.status] || STATUS_STYLE["Order Placed"]}`}>{order.status}</span>
                  <span className={`rounded-full px-3 py-1 text-sm font-bold ${order.isPaid ? "bg-primary-soft text-primary-dull" : "bg-accent-soft text-accent"}`}>
                    {order.isPaid ? "Paid" : order.paymentType === "COD" ? "Pay on delivery" : "Awaiting payment"}
                  </span>
                </div>
              </div>

              <div className="mt-4 grid gap-5 md:grid-cols-[1fr_1fr_auto]">
                <ul className="space-y-1">
                  {order.items.map((item, i) => (
                    <li key={item._id || i}>
                      <span className="font-extrabold text-primary">{item.quantity} ×</span>{" "}
                      {item.product ? `${item.product.name}${item.product.unit ? ` (${item.product.unit})` : ""}` : "Removed product"}
                    </li>
                  ))}
                </ul>
                {order.address ? (
                  <div className="text-muted">
                    <p className="font-bold text-ink">{order.address.firstName} {order.address.lastName}</p>
                    <p>{order.address.street}, {order.address.city}</p>
                    <p>{order.address.state}{order.address.zipCode ? `, ${order.address.zipCode}` : ""}</p>
                    <a href={`tel:${order.address.phone}`} className="mt-1 inline-flex items-center gap-1.5 font-bold text-primary">
                      <Phone className="size-4" aria-hidden="true" /> {order.address.phone}
                    </a>
                  </div>
                ) : (
                  <p className="text-muted">Address removed</p>
                )}
                <div className="md:text-right">
                  <p className="text-2xl font-extrabold">{formatPrice(order.amount)}</p>
                  {order.deliveryFee > 0 && <p className="text-sm text-muted">incl. {formatPrice(order.deliveryFee)} delivery</p>}
                  <label className="mt-3 block text-sm font-bold text-muted">
                    Status
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="mt-1 block h-11 w-full rounded-xl bg-white px-3 font-bold text-ink ring-2 ring-line outline-none focus:ring-primary md:w-52"
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </label>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Order;
