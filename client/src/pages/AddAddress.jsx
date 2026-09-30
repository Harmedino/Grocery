import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useAppContext } from "../contex/AppContex";
import { STORE } from "../config/store";

const STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo",
  "Ekiti", "Enugu", "FCT Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

const inputClass = "h-14 w-full rounded-xl bg-white px-4 text-lg outline-none ring-2 ring-line focus:ring-primary";

const Field = ({ label, name, hint, value, onChange, required = true, ...props }) => (
  <div>
    <label htmlFor={`addr-${name}`} className="mb-1.5 block font-bold">
      {label} {!required && <span className="font-normal text-muted">(optional)</span>}
    </label>
    <input id={`addr-${name}`} name={name} value={value} onChange={onChange} required={required} className={inputClass} {...props} />
    {hint && <p className="mt-1 text-sm text-muted">{hint}</p>}
  </div>
);

const AddAddress = () => {
  const { axios, navigate, user, setShowUserLogin } = useAppContext();
  const [saving, setSaving] = useState(false);
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: STORE.city === "Lagos" ? "Lagos" : "",
    zipCode: "",
    country: "Nigeria",
  });

  useEffect(() => {
    if (user) {
      const [firstName = "", ...rest] = (user.name || "").split(" ");
      setAddress((a) => ({ ...a, firstName: a.firstName || firstName, lastName: a.lastName || rest.join(" "), email: a.email || user.email || "" }));
    }
  }, [user]);

  const handleChange = (e) => setAddress((a) => ({ ...a, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await axios.post("/api/address/add", { address });
      if (data.success) {
        toast.success("Address saved");
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="mx-auto mt-10 max-w-xl rounded-[2rem] bg-white px-6 py-14 text-center ring-1 ring-line">
        <h1 className="text-3xl font-extrabold">Please sign in first</h1>
        <p className="mt-2 text-lg text-muted">We save your address to your account so you only type it once.</p>
        <button type="button" onClick={() => setShowUserLogin(true)} className="mt-8 h-14 rounded-2xl bg-primary px-8 text-lg font-extrabold text-white">Sign in</button>
      </div>
    );
  }

  return (
    <div className="pt-6 md:pt-10">
      <Link to="/cart" className="inline-flex min-h-12 items-center gap-2 font-bold text-primary">
        <ArrowLeft className="size-5" aria-hidden="true" /> Back to basket
      </Link>
      <div className="mt-3 grid gap-8 rounded-[2rem] bg-white p-6 ring-1 ring-line sm:p-10 lg:grid-cols-[1fr_320px]">
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Where should we deliver?</h1>
            <p className="mt-1 text-lg text-muted">Our rider will call this number when they arrive.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="First name" name="firstName" value={address.firstName} onChange={handleChange} autoComplete="given-name" />
            <Field label="Last name" name="lastName" value={address.lastName} onChange={handleChange} autoComplete="family-name" />
          </div>
          <Field label="Phone number" name="phone" type="tel" inputMode="tel" value={address.phone} onChange={handleChange} autoComplete="tel" placeholder="e.g. 0803 123 4567" />
          <Field label="House address" name="street" value={address.street} onChange={handleChange} autoComplete="street-address" placeholder="e.g. 5 Allen Avenue" hint="Add a landmark if it helps, e.g. “opposite the church”." />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Area / Town" name="city" value={address.city} onChange={handleChange} autoComplete="address-level2" placeholder="e.g. Ikeja" />
            <div>
              <label htmlFor="addr-state" className="mb-1.5 block font-bold">State</label>
              <select id="addr-state" name="state" value={address.state} onChange={handleChange} required className={inputClass}>
                <option value="">Choose your state</option>
                {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Email" name="email" type="email" value={address.email} onChange={handleChange} autoComplete="email" />
            <Field label="Postcode" name="zipCode" value={address.zipCode} onChange={handleChange} required={false} autoComplete="postal-code" />
          </div>
          <button disabled={saving} className="h-14 w-full rounded-2xl bg-primary text-lg font-extrabold text-white hover:bg-primary-dull disabled:opacity-60 sm:w-auto sm:px-10">
            {saving ? "Saving..." : "Save address"}
          </button>
        </form>
        <div className="hidden lg:block">
          <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-[#fff4e2] to-[#e7f5ea]">
            <img src="/images/scenes/house.webp" alt="" className="absolute bottom-[12%] right-[10%] w-[55%]" />
            <img src="/images/scenes/pin.webp" alt="" className="absolute left-[18%] top-[14%] w-[26%] animate-float" />
            <img src="/images/scenes/scooter.webp" alt="" className="absolute bottom-[8%] left-[6%] w-[40%]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
