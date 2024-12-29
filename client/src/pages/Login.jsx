/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const [state, setState] = useState("Sign In");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { backendUrl, isLoggedIn, setIsLoggedIn, getUserData } =
    useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Sign Up") {
        axios.defaults.withCredentials = true;
        // Call the registration API
        const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
          username,
          email,
          password,
        });

        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
          toast.success("Registration Success!");
        } else {
          toast.error(data.message);
        }
      } else {
        // Call the login API
        const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
          email,
          password,
        });

        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
          toast.success(`Welcome back ${username}`);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    isLoggedIn && navigate("/");
  }, [isLoggedIn]);

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-indigo-300 to-indigo-700">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
        alt="logo"
      />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Create Account" : "Sign In"}
        </h2>
        <p className="text-sm text-center text-white mb-6">
          {" "}
          {state === "Sign Up"
            ? "Create Your Account"
            : "Sign In to Your Account"}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="" />
              <input
                className="bg-transparent outline-none text-white w-full"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" />
            <input
              className="bg-transparent outline-none text-white w-full"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center justify-between w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <div className="flex gap-3">
              <img src={assets.lock_icon} alt="" />
              <input
                className="bg-transparent outline-none text-white w-full"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {showPassword ? (
              <img
                src={assets.close_eye}
                onClick={() => setShowPassword(!showPassword)}
                alt=""
                width={"20"}
              />
            ) : (
              <img
                onClick={() => setShowPassword(!showPassword)}
                src={assets.eye}
                width={"20"}
                alt=""
              />
            )}
          </div>

          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 text-indigo-500 cursor-pointer"
          >
            Forgot password?
          </p>

          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 hover:from-indigo-600 hover:to-indigo-800 font-medium text-white">
            {state}
          </button>
        </form>

        {state === "Sign Up" ? (
          <p className="mt-4 text-gray-400 text-center text-xs">
            Already have an account?{" "}
            <span
              onClick={() => setState("Sign In")}
              className="text-blue-400 underline cursor-pointer"
            >
              Sign In
            </span>
          </p>
        ) : (
          <p className="mt-4 text-gray-400 text-center text-xs">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-400 underline cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
