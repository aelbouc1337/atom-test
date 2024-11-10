import React from "react";
import { Product } from "@/types/product";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";

type OrderConfirmationModalProps = {
  purchasedItems: Product[];
  onClose: () => void;
};

const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  purchasedItems,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[90%] max-w-2xl p-6 rounded-lg relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <FaTimes size={20} />
        </button>
        <h2 className="text-2xl font-semibold mb-4">Order Confirmation</h2>
        <p className="mb-4">
          Thank you for your purchase! Here are your items:
        </p>
        <ul className="space-y-4">
          {purchasedItems.map((item) => (
            <li key={item.id} className="flex items-center gap-4">
              <Image src={item.image} width={60} height={60} alt={item.title} />
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
