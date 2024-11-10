import React from "react";
import { Product } from "@/types/product";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { RootState } from "@/store";
import toast from "react-hot-toast";

type ProductModalProps = {
  product: Product;
  onClose: () => void;
};

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cart.items);
  const inventory = useSelector(
    (state: RootState) => state.auth.userProfile.inventory
  );

  const isInCart = cart.some((item) => item.id === product.id);
  const isInInventory = inventory.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (!isInCart && !isInInventory) {
      dispatch(addToCart(product));
      toast.success("Product added to cart!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[90%] max-w-2xl p-6 rounded-lg relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <FaTimes size={20} />
        </button>
        <div className="flex flex-col items-center">
          <div className="w-full h-64 relative mb-4">
            <Image
              src={product.image}
              alt={product.title}
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
          <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
          <p className="text-gray-700 mb-4">${product.price}</p>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-sm text-gray-500">
            Rating: {product.rating.rate} ({product.rating.count} reviews)
          </p>

          <button
            onClick={handleAddToCart}
            disabled={isInCart || isInInventory}
            className={`bg-slate-700 ${
              isInCart || isInInventory
                ? "bg-gray-500 cursor-not-allowed"
                : "hover:bg-slate-500"
            } transition-all duration-200 mt-6 py-3 px-6 flex items-center justify-center gap-1 rounded-xl uppercase text-white font-inter`}
          >
            <HiOutlineShoppingBag size={20} />
            {isInInventory
              ? "Already Purchased"
              : isInCart
              ? "Added to Cart"
              : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
