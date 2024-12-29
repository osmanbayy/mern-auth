import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";

export default function Navbar() {
  const navigate = useNavigate();

  const { userData, backendUrl, setUserData, setIsLoggedIn } =
    useContext(AppContext);

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
      data.success && setIsLoggedIn(false);
      data.success && setUserData(false);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`);
      if (data.success) {
        navigate("/verify-email");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 shadow-md">
      <img src={assets.logo} alt="logo" className="w-28 sm:w-32" />
      {userData ? (
        <div className="flex justify-center items-center w-8 h-8 bg-black text-white relative group rounded-full">
          {userData.username[0].toUpperCase()}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
            <ul className="list-none m-0 p-4 bg-gray-600 text-sm w-32 rounded">
              {!userData.isAccountVerified && (
                <li onClick={sendVerificationOtp} className="py-1 px-2 hover:text-gray-400 cursor-pointer text-white">
                  Verify Email
                </li>
              )}

              <li onClick={logout} className="py-1 px-2 hover:text-gray-400 cursor-pointer text-white">
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="group flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100"
        >
          Login
          <img
            src={assets.arrow_icon}
            className="transition-transform duration-300 group-hover:translate-x-1"
            alt=""
          />
        </button>
      )}
    </div>
  );
}
