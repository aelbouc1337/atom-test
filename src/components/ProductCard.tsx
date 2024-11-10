import React from "react";
import { Product } from "@/types/product";
import Image from "next/image";
import { TbTruckDelivery } from "react-icons/tb";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { RootState } from "@/store";
import toast from "react-hot-toast";

type ProductCardProps = {
  product: Product;
  onProductClick: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onProductClick,
}) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const inventory = useSelector(
    (state: RootState) => state.auth.userProfile.inventory
  );

  const isInCart = cart.some((item) => item.id === product.id);
  const isInInventory = inventory.some((item) => item.id === product.id);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => {
      return i < rating ? (
        <FaStar key={i} className="text-yellow-500" />
      ) : (
        <CiStar key={i} className="text-gray-400" />
      );
    });
  };

  const handleAddToCart = () => {
    if (!isInCart && !isInInventory) {
      dispatch(addToCart(product));
      toast.success("Product added to cart!");
    }
  };

  return (
    <div
      onClick={onProductClick}
      className="p-4 bg-white relative rounded-2xl border shadow-xl shadow-slate-300 cursor-pointer hover:scale-105 transition-all duration-300"
    >
      <div className="flex gap-2 absolute z-30 left-0 top-10 items-center px-3 py-2 bg-slate-600 rounded-r-xl text-white">
        <TbTruckDelivery size={20} />
        <p>Free Shipping</p>
      </div>
      <div className="flex flex-col w-full justify-center">
        <div className="w-full h-96 relative overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <h3 className="font-bold font-inter text-xl my-2 text-left h-12">
          {product.title.length > 40
            ? product.title.substring(0, 40) + "..."
            : product.title}
        </h3>
        <p className="text-sm font-inter my-2">
          {product.description.length > 60
            ? product.description.substring(0, 60) + "..."
            : product.description}
        </p>
        <div className="w-full flex justify-between items-center">
          <span className="py-2 flex items-center justify-center rounded-lg bg-slate-700 text-white font-inter w-[80px]">
            ${product.price}
          </span>
          <span className="flex gap-1 items-center font-inter">
            {renderStars(Math.round(product?.rating.rate))}
            {`(${product?.rating.count})`}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent modal opening on button click
            handleAddToCart();
          }}
          disabled={isInCart || isInInventory}
          className={`bg-slate-700 ${
            isInInventory
              ? "bg-gray-500 cursor-not-allowed"
              : isInCart
              ? "bg-green-500 cursor-not-allowed"
              : "hover:bg-slate-500"
          } transition-all duration-200 my-3 py-3 flex items-center justify-center gap-1 rounded-xl uppercase text-white font-inter`}
        >
          <HiOutlineShoppingBag size={20} />
          {isInInventory
            ? "Sold Out"
            : isInCart
            ? "Added to Cart"
            : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
