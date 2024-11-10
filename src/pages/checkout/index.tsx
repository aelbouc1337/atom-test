import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import Image from "next/image";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { addToInventory, setUserProfile } from "@/store/slices/authSlice";
import { clearCart } from "@/store/slices/cartSlice";
import OrderConfirmationModal from "@/components/OrderConfirmationModal";
import toast from "react-hot-toast";

const Checkout: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const userProfile = useSelector((state: RootState) => state.auth.userProfile);
  const cart = useSelector((state: RootState) => state.cart.items);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const [editableProfile, setEditableProfile] = useState(userProfile);

  useEffect(() => {
    const isProfileComplete =
      userProfile.firstName &&
      userProfile.lastName &&
      userProfile.address &&
      userProfile.phoneNumber;

    if (!isProfileComplete) {
      router.push("/Profil");
    }
  }, [userProfile, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    dispatch(setUserProfile(editableProfile));
    toast.success("Profile information updated!");
  };

  const handleConfirmOrder = () => {
    dispatch(addToInventory(cart));
    dispatch(clearCart());
    setShowModal(true);
    toast.success("Order confirmed! Thank you for your purchase.");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {/* Editable User Information */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Your Information</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={editableProfile.firstName}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={editableProfile.lastName}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={editableProfile.address}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={editableProfile.phoneNumber}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2"
            />
          </div>
        </form>
        <button
          onClick={handleSaveProfile}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Save Information
        </button>
      </div>

      {/* Cart Summary */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        <ul className="space-y-4">
          {cart.map((item) => (
            <li key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src={item.image}
                  width={60}
                  height={60}
                  alt={item.title}
                />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </div>
              <span className="text-gray-800 font-semibold">${item.price}</span>
            </li>
          ))}
        </ul>
        <hr className="my-4" />
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Total</h3>
          <span className="text-xl font-bold text-red-600">${total}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-blue-600 hover:underline"
        >
          <MdOutlineKeyboardArrowLeft size={24} />
          Continue Shopping
        </button>
        <button
          onClick={handleConfirmOrder}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Confirm Order
        </button>
      </div>

      {showModal && (
        <OrderConfirmationModal
          purchasedItems={userProfile.inventory.slice(-cart.length)}
          onClose={() => {
            setShowModal(false);
            router.push("/");
          }}
        />
      )}
    </div>
  );
};

export default Checkout;
