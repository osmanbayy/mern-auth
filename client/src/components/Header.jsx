import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Header() {
  const { userData } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
      <img
        src={assets.header_img}
        alt=""
        className="w-36 h-36 rounded-full mb-6"
      />

      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
        Hey {userData ? userData.username : "Developer"}
        <img src={assets.hand_wave} alt="" className="w-8 aspect-square" />{" "}
      </h1>

      <h2 className="font-semibold text-3xl sm:text-5xl mb-4">
        Welcome to my authentication project.
      </h2>

      <p className="mb-8 max-w-md">
        Let&apos;s see the source codes of this project and my github account
        for many more mern stack projects.
      </p>

      <Link
        to={"https://github.com/osmanbayy"}
        target="_blank"
        className="group flex items-center gap-2 border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all"
      >
        {" "}
        <img src={assets.github} alt="" />{" "}
        <span className="group-hover:tracking-wide transition-all duration-300">
          Visit Github
        </span>
      </Link>
    </div>
  );
}
