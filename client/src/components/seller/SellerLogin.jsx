import React, { useEffect, useState } from "react";
import { useAppContext } from "../../contex/AppContex";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSeller(true);
  };
  return (
    !isSeller && (
      <div>
        <form
          onSubmit={onSubmitHandler}
          className="min-h-screen flex items-center text-sm text-grey-600"
        >
          <div className="flex flex-col gap-5 m-auto items-center p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-grey-200">
            <p className="text-2xl font-medium m-auto">
              <span className="text-primary">Seller</span> Login
            </p>

            <div className="w-full">
              <p>Email</p>
              <input
                type="email"
                placeholder="enter your email"
                className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                required
                onChange={(e)=> setEmail(e.target.value)}
                value={email}
              ></input>
            </div>

            <div className="w-full">
              <p>Password</p>
              <input
                type="password"
                placeholder="enter your password"
                className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                required
                onChange={(e)=> setPassword(e.target.value)}
                value={password}
              ></input>
            </div>
            <button className="bg-primary text-white w-full py-2 rounded-md cursor-pointer">
              login
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default SellerLogin;
