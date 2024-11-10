import React, { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useDispatch } from "react-redux";
import { setUserProfile } from "@/store/slices/authSlice";
import Footer from "@/components/UI/Footer";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const Profil = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(
        setUserProfile({
          firstName,
          lastName,
          address,
          phoneNumber,
          inventory: [],
        })
      );
      toast.success("Thank you for completing your information.");
      router.push("/");
    } catch (error) {
      console.error("Submit failed:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-2xl px-8 py-10 md:px-10">
          <div className="flex items-center justify-between mb-6">
            <h2
              onClick={() => router.push("/")}
              className="flex items-center text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              <MdOutlineKeyboardArrowLeft size={24} />
              <span className="ml-1">Continue Shopping</span>
            </h2>
          </div>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-gray-800">
              Complete Your Profile
            </h1>
            <p className="text-gray-500 mt-2">
              Please fill in your information below
            </p>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="border border-gray-300 rounded-lg py-2 px-4 bg-gray-100 focus:bg-white focus:border-slate-700 transition-colors duration-300"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="border border-gray-300 rounded-lg py-2 px-4 bg-gray-100 focus:bg-white focus:border-slate-700 transition-colors duration-300"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="text"
              name="address"
              id="address"
              className="border border-gray-300 rounded-lg py-2 px-4 bg-gray-100 focus:bg-white focus:border-slate-700 transition-colors duration-300"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="tel"
              name="phone"
              id="phone"
              className="border border-gray-300 rounded-lg py-2 px-4 bg-gray-100 focus:bg-white focus:border-slate-700 transition-colors duration-300"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button
              type="submit"
              className="py-3 w-full text-xl text-white rounded-lg font-semibold bg-slate-700 hover:bg-slate-800 transition-all duration-300"
            >
              Submit
            </button>
          </form>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Profil;
