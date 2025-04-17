"use client";
import React, { useState, useEffect } from "react";
import {
  FileText,
  Download,
  RefreshCw,
  DollarSign,
  Activity,
  User,
} from "lucide-react";
import { useSession } from "next-auth/react";
import useFetch from "../hooks/useFetch";
import axios from "axios";

const APIUsageDashboard = () => {
  const { data: session, status } = useSession();
  const [isGeneratingBill, setIsGeneratingBill] = useState(false);
  const [plan,setPlan] = useState("Free");

  // Default usage data
  const [usageData, setUsageData] = useState({
    totalCalls: 24567,
    responseTime: 127,
    currentAmount: 415.28,
    monthlyUsage: [
      { name: "Jan", apiCalls: 4000 },
      { name: "Feb", apiCalls: 3000 },
      { name: "Mar", apiCalls: 2000 },
      { name: "Apr", apiCalls: 2780 },
      { name: "May", apiCalls: 1890 },
      { name: "Jun", apiCalls: 2390 },
    ],
    currentBillingPeriod: "June 1 - June 30, 2025",
    apiCallsThisMonth: 18452,
  });

  // Only fetch when session is available and user has an email
  const { data, loading, error } = useFetch(
    session?.user?.email
      ? `http://localhost:8081/api/v1/usage/${session.user.email}`
      : null
  );

  //   /api/v1/cost/spl.sp1234@gmail.com
  const {
    data: costData,
    error: costError,
  } = useFetch(
    session?.user?.email
      ? `http://localhost:8081/api/v1/cost/${session.user.email}`
      : null
  );

  // Update usage data when API data is received
  useEffect(() => {
    if (data && !loading) {
      setUsageData((prevData) => ({
        ...prevData,
        totalCalls: data?.message,
        currentAmount: costData?.message,
      }));
    }
  }, [data, loading]);


  const upgradePlan = async()=>{
    try {
        await axios.put(`http://localhost:8081/api/v1/upgrade/${session?.user?.email}`)
        setPlan("Paid")
        alert('Plan Upgrade')
    } catch (error) {
        console.log(error)
    }

  }

  const handleGenerateBill = async () => {
    if (!session?.user?.email) {
      alert("You must be logged in to generate a bill");
      return;
    }

    setIsGeneratingBill(true);

    try {
     
      const response = await fetch(`http://localhost:8081/api/v1/billing/${session.user.email}`);
      
      if (!response.ok) {
        throw new Error('Failed to generate bill');
      }

      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Log user information being used for billing

      setIsGeneratingBill(false);
      alert("Bill generated successfully and sent to your email!");
    } catch (error) {
      console.error("Error generating bill:", error);
      setIsGeneratingBill(false);
      alert("Error generating bill. Please try again.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            API Usage Dashboard
          </h1>

          {session?.user && (
            <div className="mt-4 md:mt-0 bg-white p-3 rounded-lg shadow flex items-center">
              <User className="w-5 h-5 text-gray-500 mr-2" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {session.user.firstName
                    ? `${session.user.firstName} ${session.user.lastName}`
                    : session.user.name || "User"}
                </p>
                <p className="text-xs text-gray-500">{session.user.email}</p>
              </div>
            </div>
          )}
        </header>

        {/* API Data Error state */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Error loading API data: {error.message || "Unknown error"}
                </p>
              </div>
            </div>
          </div>
        )}

        {costError && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Error loading API data: {costError.message || "Unknown error"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Session Loading state */}
        {status === "loading" && (
          <div className="flex justify-center items-center h-64">
            <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin" />
            <span className="ml-2 text-gray-700">Loading dashboard...</span>
          </div>
        )}

        {/* Not authenticated state */}
        {status === "unauthenticated" && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  You are not signed in. Some features may be limited.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard content - only show when authenticated or loading is complete */}
        {(status === "authenticated" || status === "unauthenticated") && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total API Calls
                    </p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">
                      {usageData.totalCalls ? usageData.totalCalls.toLocaleString() : "0" }
                    </p>
                  </div>
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <Activity className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>
                <p className="text-sm text-green-600 mt-2 flex items-center">
                  <span>↑ 12% from last month</span>
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Average Response Time
                    </p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">
                      {usageData.responseTime}ms
                    </p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <RefreshCw className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
                <p className="text-sm text-red-600 mt-2 flex items-center">
                  <span>↑ 5% from last week</span>
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Current Bill
                    </p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">
                      ${usageData.currentAmount}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-2">
                  <button
                    onClick={handleGenerateBill}
                    disabled={isGeneratingBill || status !== "authenticated"}
                    className={`flex items-center text-sm font-medium ${
                      status === "authenticated"
                        ? "text-blue-600 hover:text-blue-800"
                        : "text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {isGeneratingBill ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4 mr-1" />
                        Generate Bill
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h1>Here is your api endpoint</h1>
              <div className="flex items-center justify-between p-4">
                <div className="overflow-x-auto">
                  <code className="text-sm font-mono text-indigo-600 whitespace-nowrap">
                    localhost:8081/api/v1/service?auth={session?.user?.email}
                  </code>
                </div>
              </div>
            </div>

            {/* Generate Bill Section */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Generate Bill
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Current Billing Period
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {usageData.currentBillingPeriod}
                  </p>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      API Calls:{" "}
                      <span className="font-medium text-gray-900">
                        {usageData.totalCalls}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Current Amount:{" "}
                      <span className="font-medium text-gray-900">
                        ${usageData.currentAmount}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Pricing Tier
                  </h3>
                  <p className="text-gray-600 text-sm">{plan} Plan</p>
                  <div className="mt-4">
                    <button onClick={upgradePlan} className="w-full py-2 px-4 rounded-md flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500">
                      Upgrade Plan
                    </button>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      Generate Invoice
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Download your invoice as PDF
                    </p>
                    {session?.user?.email && (
                      <p className="text-xs text-gray-500 mt-1">
                        Invoice will be sent to: {session.user.email}
                      </p>
                    )}
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={handleGenerateBill}
                      disabled={isGeneratingBill || status !== "authenticated"}
                      className={`w-full py-2 px-4 rounded-md flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        status === "authenticated"
                          ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {isGeneratingBill ? (
                        <>
                          <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Download className="w-5 h-5 mr-2" />
                          Generate Bill
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default APIUsageDashboard;
