import { RootState } from "@/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { MdOutlineKeyboardArrowLeft, MdOutlinePayment } from "react-icons/md";
import Image from "next/image";
import { VscTrash } from "react-icons/vsc";
import { clearCart, removeFromCart } from "@/store/slices/cartSlice";
import { AiOutlineClear } from "react-icons/ai";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { div } from "framer-motion/client";
import { IoClose } from "react-icons/io5";

interface CartProps {
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cart: React.FC<CartProps> = ({ showCart, setShowCart }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const cart = useSelector((state: RootState) => state.cart.items);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleRemoveFromCart = (id: number): void => {
    dispatch(removeFromCart(id));
    toast.success("Item Deleted From Cart");
  };
  const handleClearCart = (): void => {
    dispatch(clearCart());
    toast.success("Empty Cart !");
  };
  return (
    <div className="overflow-hidden fixed inset-0 z-50">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: showCart ? "0%" : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute md:top-28 top-28 md:right-0 right-0 w-full lg:w-[50%] md:px-8 md:py-4 p-2 bg-white rounded-3xl shadow-2xl shadow-slate-700"
      >
        <div
          onClick={() => setShowCart(false)}
          className=" flex flex-row-reverse cursor-pointer mb-2"
        >
          <div className="p-2 border-2 border-black rounded-full">
            <IoClose size={25} />
          </div>
        </div>
        <div className="flex w-full justify-between items-center">
          <h2
            onClick={() => setShowCart(false)}
            className="text-lg font-semibold flex cursor-pointer font-inter items-center"
          >
            <MdOutlineKeyboardArrowLeft size={25} />
            Continue Shopping
          </h2>

          <span
            onClick={handleClearCart}
            className="cursor-pointer flex items-center gap-1 font-inter font-semibold border-b-2 border-black text-lg"
          >
            <AiOutlineClear size={20} /> Clear cart
          </span>
        </div>

        <hr className="w-full  border my-4" />
        <h3 className="font-inter font-semibold text-lg">Shopping cart</h3>
        <h4 className="font-inter text-sm">
          You have {cart.length} item in your cart
        </h4>
        <ul className="flex my-3 flex-col gap-2 w-full">
          {cart.map((product) => (
            <li className="px-3 py-3 bg-white flex shadow-md border rounded-3xl justify-between items-center">
              <div className="flex flex-row gap-2 items-center font-inter">
                <Image
                  src={product.image}
                  width={70}
                  height={70}
                  alt="picture"
                />
                <h3 className="max-w-48 font-inter font-semibold">
                  {product.title}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-inter">${product.price}</span>
                <VscTrash
                  className="cursor-pointer"
                  onClick={() => handleRemoveFromCart(product.id)}
                  size={30}
                />
              </div>
            </li>
          ))}
        </ul>
        <div className="w-full flex mt-9 items-center justify-between">
          <span className="font-inter font-semibold p-2 border rounded-xl shadow-md">
            Total : <span className="text-red-600">${total}</span>
          </span>
          <button
            onClick={() => router.push("/checkout")}
            disabled={cart.length < 1}
            className={`px-5 py-3 flex items-center justify-center gap-1 bg-black text-white rounded-xl font-inter tracking-widest ${
              cart.length < 1 ? "bg-gray-500 cursor-not-allowed" : ""
            }`}
          >
            <MdOutlinePayment size={20} />
            Proceed to Checkout
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Cart;
