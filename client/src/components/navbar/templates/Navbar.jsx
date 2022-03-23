import React from "react";
import Dropdown from "../organisms/Dropdown";
import { useNavigate } from "react-router-dom";
import DropdownProfile from "../organisms/DropdownProfile";

export default function Navbar({ setLoginBuyer, setLoginDealer }) {
  const navigate = useNavigate();
  return (
    <div className="w-full h-16 px-36 flex flex-row justify-between text-slate-900">
      <div className="w-1/4 h-full font-semibold font-encode text-xl flex justify-start items-center">
        LOGO
      </div>
      <div className="w-1/2 h-full flex flex-row gap-x-8 justify-center items-center text-xl">
        <button
          className="h-full font-semibold font-encode hover:border-b hover:border-orange-600"
          onClick={() => navigate("/")}
        >
          Home
        </button>
        <button
          className="h-full font-semibold font-encode hover:border-b hover:border-orange-600"
          onClick={() => navigate("/cars")}
        >
          Browse Car
        </button>
        <button
          className="h-full font-semibold font-encode hover:border-b hover:border-orange-600"
          onClick={() => navigate("/dealer/dashboard")}
        >
          Sell Car
        </button>
        <button className="h-full font-bold font-open-sans hover:border-b hover:border-orange-600"
        onClick={() => navigate("/mybill")}>
          My Bill
        </button>
      </div>
      <div className="h-full w-1/4 flex flex-row gap-x-8 justify-end items-center text-xl">
        { !localStorage.getItem("access_token") ? (
          <>
            {" "}
            <Dropdown
              title="Login"
              setLoginBuyer={setLoginBuyer}
              setLoginDealer={setLoginDealer}
            />
            <Dropdown title="Register" />{" "}
          </>
        ) : (
          <DropdownProfile />
        )}
      </div>
    </div>
  );
}
