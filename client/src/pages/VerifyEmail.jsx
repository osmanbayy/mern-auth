/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { useContext, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/AppContext.jsx";

export default function VerifyEmail() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const { backendUrl, isLoggedIn, userData, getUserData } =
  useContext(AppContext);
  
  const inputRefs = useRef([]);
  
  const handleInput = (e, index) => {
    if (!/^\d*$/.test(e.target.value)) {
      e.target.value = e.target.value.replace(/\D/g, ""); // clear the non-numeric characters
      return;
    }
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");

      const { data } = await axios.post(
        `${backendUrl}/api/auth/verify-account`,
        { otp }
      );
      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(()=> {
    isLoggedIn && userData && userData.isAccountVerified && navigate("/");
  }, [isLoggedIn, userData])

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-indigo-300 to-indigo-700">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
        alt="logo"
      />

      <form onSubmit={onSubmitHandler} className="bg-slate-900 p-8 rounded-lg shadow-lg text-sm w-96">
        <h1 className="text-white text-2xl text-center font-semibold mb-4">
          Verify Your Account
        </h1>
        <p className="text-indigo-300 mb-6 text-center">
          Enter the 6-digit code sent to your email.
        </p>
        <div onPaste={handlePaste} className="flex justify-between mb-8">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength="1"
                key={index}
                pattern="[0-9]*"
                inputMode="numeric"
                required
                className="w-12 h-12 bg-[#333a5c] text-white text-center text-xl rounded-md"
                ref={(e) => (inputRefs.current[index] = e)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>
        <button className="w-full py-2.5 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-full">
          Verify Email
        </button>
      </form>
    </div>
  );
}
