"use client";

import { useRouter } from "next/navigation";
import React from "react";

const HomePage = () => {
  const router = useRouter();

  const handleSignUp = () => {
    router.push("/api/auth/signup");
  };

  const handleSignIn = () => {
    router.push("/api/auth/signin");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-between bg-gray-900 text-white font-sans relative">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-800 to-gray-900 opacity-80"></div>

      <main className="flex flex-col items-center justify-center relative z-10 px-6 text-center space-y-8 pt-10 flex-grow">
        <h1 className="text-5xl font-extrabold text-green-500 animate-pulse">
          EZ Pay
        </h1>
        <h2 className="text-2xl font-semibold text-white tracking-tight">
          Secure & Seamless Transactions
        </h2>
        <p className="text-base max-w-lg text-gray-300">
          Effortlessly manage your payments, track your transactions, and enjoy
          top-notch security for all your financial needs.
        </p>

        <div className="flex gap-8 mt-6">
          <button
            onClick={handleSignUp}
            className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-500 hover:scale-110 hover:shadow-2xl transform transition-all duration-300"
          >
            Sign Up
          </button>
          <button
            onClick={handleSignIn}
            className="px-8 py-3 bg-gray-700 text-gray-100 font-semibold rounded-lg shadow-lg hover:bg-gray-600 hover:scale-110 hover:shadow-2xl transform transition-all duration-300"
          >
            Sign In
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-12 max-w-3xl mx-auto">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-green-400 text-center">
              Secure Transactions
            </h3>
            <p className="text-sm text-gray-300 text-center mt-2">
              Our top-tier encryption ensures all your transactions are private,
              secure, and reliable.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-green-400 text-center">
              Instant Transfers
            </h3>
            <p className="text-sm text-gray-300 text-center mt-2">
              Send funds worldwide within seconds, with real-time updates and
              confirmations.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-green-400 text-center">
              Low Fees
            </h3>
            <p className="text-sm text-gray-300 text-center mt-2">
              Enjoy the lowest transaction fees without compromising on service
              quality.
            </p>
          </div>
        </div>
      </main>

      <footer className="relative z-10 text-center pb-6 text-xs text-gray-500">
        <p>&copy; 2024 EZ Pay. All Rights Reserved.</p>
        <p>Effortless payments for everyone, everywhere.</p>
      </footer>
    </div>
  );
};

export default HomePage;
