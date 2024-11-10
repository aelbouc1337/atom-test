import Image from "next/image";
import React, { useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import Cart from "../Cart";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface NavbarProps {
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ showCart, setShowCart }) => {
  const cart = useSelector((state: RootState) => state.cart.items);
  return (
    <div className="relative bg-[#f7f3f3] w-full lg:h-24 h-20 rounded-b-md box-border shadow-md flex justify-between items-center shadow-slate-300 lg:px-12 px-3">
      <Image src="/logo.png" width={150} height={150} alt="logo" />
      {showCart && <Cart showCart={showCart} setShowCart={setShowCart} />}
      <ul className="hidden md:flex items-center font-inter tracking-widest font-medium gap-6">
        <li>Shop</li>
        <li>Categories</li>
        <li>About Us</li>
      </ul>
      <div
        onClick={() => setShowCart(!showCart)}
        className="relative cursor-pointer"
      >
        <HiOutlineShoppingBag size={40} />
        <span className="rounded-full top-0 right-2 font-bold  translate-x-[50%] bg-white border-black flex items-center justify-center border-2 absolute w-6 h-6 font-inter text-sm">
          {cart.length}
        </span>
      </div>
    </div>
  );
};

export default Navbar;
