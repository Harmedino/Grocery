import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppContext } from "../../contex/AppContex";
import Logo from "../Logo";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isSeller) navigate("/seller");
  }, [isSeller, navigate]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/seller/login", { email, password });
      if (data.success) {
        setIsSeller(true);
        navigate("/seller");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  if (isSeller) return null;

  return (
    <div className="grid min-h-screen place-items-center bg-canvas p-4">
      <form onSubmit={onSubmitHandler} className="w-full max-w-md space-y-5 rounded-[2rem] bg-white p-8 shadow-xl ring-1 ring-line">
        <Link to="/"><Logo /></Link>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Store owner sign in</h1>
          <p className="mt-1 text-muted">Manage products and see new orders.</p>
        </div>
        <div>
          <label htmlFor="seller-email" className="mb-1.5 block font-bold">Email</label>
          <input id="seller-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="h-14 w-full rounded-xl px-4 text-lg outline-none ring-2 ring-line focus:ring-primary" />
        </div>
        <div>
          <label htmlFor="seller-password" className="mb-1.5 block font-bold">Password</label>
          <input id="seller-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="h-14 w-full rounded-xl px-4 text-lg outline-none ring-2 ring-line focus:ring-primary" />
        </div>
        <button className="h-14 w-full rounded-2xl bg-primary text-lg font-extrabold text-white hover:bg-primary-dull">Sign in</button>
      </form>
    </div>
  );
};

export default SellerLogin;
