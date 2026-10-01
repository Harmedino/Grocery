import React from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { useAppContext } from "../contex/AppContex";
import { STORE } from "../config/store";

const Field = ({ label, id, ...props }) => (
  <div>
    <label htmlFor={id} className="mb-1.5 block font-bold text-ink">{label}</label>
    <input
      id={id}
      {...props}
      className="h-14 w-full rounded-2xl border-2 border-ink/60 bg-white px-4 text-lg outline-none focus:border-ink focus:ring-4 focus:ring-sun"
    />
  </div>
);

const Login = () => {
  const { setShowUserLogin, loginUser, axios } = useAppContext();
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`/api/user/${state}`, { name, email, password });
      if (data.success) {
        // Stay on the current page so a shopper mid-checkout keeps going
        loginUser(data.user);
        setShowUserLogin(false);
        toast.success(`Welcome${data.user?.name ? `, ${data.user.name.split(" ")[0]}` : ""}!`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const isRegister = state === "register";

  return (
    <div onClick={() => setShowUserLogin(false)} className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[95vh] w-full max-w-md overflow-y-auto rounded-t-[1.75rem] border-2 border-ink bg-canvas p-6 shadow-2xl sm:rounded-[1.75rem] sm:p-8"
      >
        <button
          type="button"
          onClick={() => setShowUserLogin(false)}
          className="absolute right-4 top-4 flex h-11 items-center gap-1 rounded-xl px-3 font-bold text-muted hover:bg-white"
        >
          <X className="size-5" aria-hidden="true" /> Close
        </button>

        <img src="/images/scenes/waving-woman.webp" alt="" aria-hidden="true" className="size-20" />
        <h2 id="login-title" className="mt-3 text-3xl font-extrabold tracking-tight">
          {isRegister ? "Create your account" : "Welcome back"}
        </h2>
        <p className="mt-1 text-muted">
          {isRegister ? `It takes one minute. Then you can order from ${STORE.name}.` : "Sign in to see your basket and orders."}
        </p>

        <form onSubmit={onSubmitHandler} className="mt-6 space-y-4">
          {isRegister && (
            <Field label="Your name" id="login-name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required />
          )}
          <Field label="Email address" id="login-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Field
            label="Password"
            id="login-password"
            type="password"
            autoComplete={isRegister ? "new-password" : "current-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button disabled={loading} className="btn btn-sun h-14 w-full text-lg disabled:opacity-60">
            {loading ? "Please wait..." : isRegister ? "Create account" : "Sign in"}
          </button>
        </form>

        <div className="card-pop mt-6 p-4 text-center">
          {isRegister ? (
            <p>
              Already have an account?{" "}
              <button type="button" onClick={() => setState("login")} className="font-extrabold text-primary underline underline-offset-4">Sign in</button>
            </p>
          ) : (
            <p>
              New here?{" "}
              <button type="button" onClick={() => setState("register")} className="font-extrabold text-primary underline underline-offset-4">Create an account</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
