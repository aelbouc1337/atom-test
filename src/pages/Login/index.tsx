import React, { useState } from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { useLoginMutation } from "@/store/api/authApi";
import { useRouter } from "next/router";
import { login } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import Footer from "@/components/UI/Footer";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMutation, { error, isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginMutation({ username, password }).unwrap();
      localStorage.setItem("token", response.token);
      dispatch(login());
      router.push("/Profil");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-2xl px-8 py-10 md:px-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Please login to your account</p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            className="border border-gray-300 rounded-lg py-2 px-4 bg-gray-100 focus:bg-white focus:border-slate-700 transition-colors duration-300"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            className="border border-gray-300 rounded-lg py-2 px-4 bg-gray-100 focus:bg-white focus:border-slate-700 transition-colors duration-300"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={`py-3 w-full text-xl text-white rounded-lg font-semibold ${
              isLoading
                ? "bg-slate-500 cursor-not-allowed"
                : "bg-slate-700 hover:bg-slate-800"
            } transition-all duration-300`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && (
          <p className="text-center text-red-500 mt-4">
            Login failed. Please check your credentials.
          </p>
        )}
        <div className="relative flex py-6 items-center">
          <hr className="w-full border-gray-300" />
          <span className="px-2 text-gray-500">or</span>
          <hr className="w-full border-gray-300" />
        </div>
        <button className="flex gap-2 items-center justify-center bg-gray-200 hover:bg-gray-300 transition-all duration-300 w-full py-3 rounded-lg font-semibold text-gray-600">
          <FcGoogle size={25} /> Sign in with Google
        </button>
        <div className="text-center mt-6">
          <span className="text-gray-600">
            Don’t have an account?{" "}
            <a className="text-blue-600 hover:underline" href="#">
              Sign up Now
            </a>
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
