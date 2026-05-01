
import React from "react";
import { useAppContext } from "../contex/AppContex";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Login = () => {
    const {setShowUserLogin, setUser, axios, navigate}  = useAppContext()
;    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onSubmitHandler = async (e) => {
      try {
          e.preventDefault()
          const {data} =  await axios.post(`/api/user/${state}`,{
            name,email,password
          })
          if(data.success){
            navigate('/')
            setUser(data.user)
            setShowUserLogin(false)
          }else{
            toast.error(data.message)
          }
      
        
      } catch (error) {
          toast.error(error.message)
        
      }
    }

        return (
                <div onClick={()=> setShowUserLogin(false)} className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4">
                    <div onClick={(e)=> e.stopPropagation()} className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                            <div className="w-32 h-32 bg-gradient-to-tr from-emerald-400 to-green-600 rounded-full flex items-center justify-center shadow-xl">
                                <img src={assets.profile_icon} alt="logo" className="w-20 h-20" />
                            </div>
                        </div>

                        <form onSubmit={onSubmitHandler} className="pt-20 mt-16 px-8 pb-8 flex flex-col gap-4 text-gray-700">
                            <h2 className="text-2xl font-semibold text-center">
                                <span className="text-emerald-600">User</span> {state === "login" ? "Login" : "Sign Up"}
                            </h2>

                            {state === "register" && (
                                <div className="w-full ">
                                    <label className="text-sm text-gray-500">Name</label>
                                    <input onChange={(e) => setName(e.target.value)} value={name} placeholder="Your full name" className="mt-1 border border-gray-200 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-emerald-300" type="text" required />
                                </div>
                            )}

                            <div className="w-full">
                                <label className="text-sm text-gray-500">Email</label>
                                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="you@example.com" className="mt-1 border border-gray-200 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-emerald-300" type="email" required />
                            </div>

                            <div className="w-full">
                                <label className="text-sm text-gray-500">Password</label>
                                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="••••••••" className="mt-1 border border-gray-200 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-emerald-300" type="password" required />
                            </div>

                            <div className="flex justify-between items-center text-sm text-gray-500">
                                {state === "register" ? (
                                    <p>Already have an account? <span onClick={() => setState("login")} className="text-emerald-600 cursor-pointer">Sign in</span></p>
                                ) : (
                                    <p>Create an account? <span onClick={() => setState("register")} className="text-emerald-600 cursor-pointer">Sign up</span></p>
                                )}

                                <a className="text-emerald-600" href="#">Forgot Password?</a>
                            </div>

                            <button className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition-transform transform hover:-translate-y-0.5">
                                {state === "register" ? "Create Account" : "Login"}
                            </button>

                        </form>
                    </div>
                </div>
        );
};
export default Login