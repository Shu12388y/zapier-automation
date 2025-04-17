"use client";

import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const PayNowButton = () => {
  const { data: session } = useSession();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    await axios.get(
      `http://localhost:8081/api/v1/invoice/${session?.user?.email}`
    );

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert("Payment successful!");
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors font-medium"
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default PayNowButton;
