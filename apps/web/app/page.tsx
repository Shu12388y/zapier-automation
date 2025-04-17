"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";

function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <nav className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center">
                  <svg
                    className="h-8 w-8 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  <span className="ml-2 text-xl font-bold">CryptoAPI</span>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    href="/pricing"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/documentation"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
                  >
                    Documentation
                  </Link>
                  <Link
                    href="/about"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
                  >
                    About
                  </Link>
                  <Link
                    href="/blog"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
                  >
                    Blog
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium rounded-md text-white hover:bg-gray-800"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="ml-3 px-4 py-2 text-sm font-medium rounded-md bg-blue-600 hover:bg-blue-700"
                >
                  Sign up
                </Link>
              </div>
            </div>
            <div className="flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/pricing"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
              >
                Pricing
              </Link>
              <Link
                href="/documentation"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
              >
                Documentation
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
              >
                About
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
              >
                Blog
              </Link>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="px-2 space-y-1">
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 hover:bg-blue-700"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                Real-time <span className="text-blue-500">Crypto Price</span>{" "}
                API for Developers
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Access reliable, fast, and accurate cryptocurrency market data
                through our simple and powerful REST API.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/api/auth/signin"
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition-colors"
                >
                  Get API Key
                </Link>
                <Link
                  href="/"
                  className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-md transition-colors"
                >
                  View Docs
                </Link>
              </div>
              <div className="mt-8">
                <p className="text-gray-400 mb-2">
                  Trusted by developers worldwide
                </p>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-gray-400">
                  GET /api/v1/prices
                </span>
                <span className="bg-green-800 text-green-200 text-xs px-2 py-1 rounded">
                  200 OK
                </span>
              </div>
              <pre className="bg-gray-900 p-4 rounded overflow-x-auto text-sm">
                <code className="text-gray-300">
                  {`{
  "timestamp": "2025-04-16T15:30:00Z",
  "prices": [
    {
      "symbol": "BTC",
      "name": "Bitcoin",
      "price_usd": 89427.35,
      "change_24h": 2.14,
      "market_cap": 1763492103850
    },
    {
      "symbol": "ETH",
      "name": "Ethereum",
      "price_usd": 4832.18,
      "change_24h": 0.86,
      "market_cap": 578934572102
    },
    {
      "symbol": "SOL",
      "name": "Solana",
      "price_usd": 286.75,
      "change_24h": 3.21,
      "market_cap": 129754203948
    }
  ]
}`}
                </code>
              </pre>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="rounded-full bg-blue-900 p-3 inline-block mb-4">
                <svg
                  className="h-6 w-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-gray-400">
                99.9% uptime with global CDN and response times under 50ms.
              </p>
            </div>
            <div className="p-6">
              <div className="rounded-full bg-blue-900 p-3 inline-block mb-4">
                <svg
                  className="h-6 w-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Reliable Data</h3>
              <p className="text-gray-400">
                Aggregated data from 30+ exchanges for maximum accuracy.
              </p>
            </div>
            <div className="p-6">
              <div className="rounded-full bg-blue-900 p-3 inline-block mb-4">
                <svg
                  className="h-6 w-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Flexible Integration</h3>
              <p className="text-gray-400">
                Simple REST API with SDK support for major programming
                languages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
