import React, { useState, useEffect, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react";
import axios from "axios";
import { toast } from "react-toastify"

const Login = () => {
  const [state, setState] = useState("Login");
  const { setShowLogin,backendUrl,setToken,setUser } = useContext(AppContext);

   const [name,setName] = useState("");
   const [email,setEmail] = useState("");
   const [password,setPassword] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if(state ==='Login'){
      const {data} = await axios.post(backendUrl + '/api/user/login',{email,password})
       if(data.success){
         setToken(data.token);
         setUser(data.user);
     localStorage.setItem('token',data.token)
      setShowLogin(false);
       } else{
         toast.error(data.message);
         }
      } else {
        const {data} = await axios.post(backendUrl + '/api/user/register',{name,email,password})
         if(data.success){
           setToken(data.token);
           setUser(data.user);
        localStorage.setItem('token',data.token)
        setShowLogin(false);
         } else{
           toast.error(data.message);
           } 
      }
    } catch (error) {
       toast.error(error.message);
    }
    
  }

  
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center backdrop-blur-sm bg-black/30">
      <motion.form 
        onSubmit={handleSubmit}
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-center text-2xl text-neutral-500 font-medium">
          {state}
        </h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>

        {state !== "Login" && (
          <div className="border px-6 py-2 rounded-full flex items-center gap-1 mt-5">
            <img className="w-5" src={assets.profile_icon} alt="" />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="outline-none text-sm"
              placeholder="Full Name"
              required
            />
          </div>
        )}

        <div className="border px-6 py-2 rounded-full flex items-center gap-2 mt-5">
          <img src={assets.email_icon} alt="" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="outline-none text-sm"
            placeholder="Email id"
            required
          />
        </div>

        <div className="border px-6 py-2 rounded-full flex items-center gap-2 mt-5">
          <img src={assets.lock_icon} alt="" />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="outline-none text-sm"
            placeholder="Password"
            required
          />
        </div>

        <p className="text-sm text-blue-600 my-4 cursor-pointer">
          Forgot Password?
        </p>
        <button className="w-full bg-gray-800 text-white rounded-md mt-8 text-sm py-2.5 min-w-52">
          {state === "Login" ? "Login" : "Create Account"}
        </button>

        {state === "Login" ? (
          <p className="text-sm mt-4">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="text-sm mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}

        <img
          onClick={() => setShowLogin(false)}
          className="absolute top-5 right-5 cursor-pointer"
          src={assets.cross_icon}
          alt=""
        />
      </motion.form>
    </div>
  );
};
export default Login;
