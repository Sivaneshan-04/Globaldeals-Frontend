"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Search from "./Search";
import {  getUserCookies } from "../../utils/getCookies";
import { logoutHandler } from "../../utils/Home/helper";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Header = () => {
  const [user, setUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const user = await getUserCookies();
      if (user) setUser(JSON.parse(user.value));
    };
    checkLogin();
  }, []);

  const logout = async (e) => {
    try{
      await logoutHandler();
      setUser(false);
      router.push('/login');

    }catch(e){
      toast.error("Error logging out");
    }
  }

  return (
    <div className="w-full bg-green-400 py-2 flex flex-row">
      <h1 className="text-3xl pl-8 pr-8 sm:p font-bold text-black">
        GlobalDeals
      </h1>
      {/* <Search /> */}
      <div className="ml-auto mr-6">
        {!user ? (
          <Link
            href={"/login"}
            className="text-xl text-gray-800 hover:bg-gray-700 hover:text-green-400 font-bold p-4"
          >
            Login
          </Link>
        ) : <div className="flex flex-row gap-4">
            <p className="font-bold text-2xl ">{user}</p>
            <button onClick={logout} size="sm" className="text-xl text-gray-800 hover:bg-gray-700 hover:text-green-400 font-bold">SignOut</button>
          </div>
          
          }{" "}
      </div>
    </div>
  );
};

export default Header;
