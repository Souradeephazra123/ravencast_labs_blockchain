"use client";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const pricesWs = new WebSocket("wss://ws.coincap.io/prices?assets=ALL");

    pricesWs.onmessage = function (msg) {
      const data = JSON.parse(msg.data);
      console.log("data", data);
      setPrices((prevPrices) => ({ ...prevPrices, ...data }));
    };
    console.log(prices);

    return () => {
      pricesWs.close();
    };
  }, []);

  //   const formatPrice = (price) => {
  //     return new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(price);
  //   };

  const formatPrice = (price) => {
    if (!price || Number.isNaN(Number(price))) return "N/A"; // Handle invalid prices

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2, // Consistent decimal places
      maximumFractionDigits: 6, // Handle price variations. Consider dynamic precision based on price magnitude
    }).format(price);
  };

  const renderPrices = () => {
    return Object.entries(prices).map(([key, value]) => (
      <div key={key}>
        <p>
          {key}: {formatPrice(value)}
        </p>
      </div>
    ));
  };
  console.log(prices);
  return (
    <div className="p-7  globalbg globalbgtext bg-gradient-to-r from-[#0d142100] via-black to-[#0D1421] min-h-screen">
      <p className=" text-xl font-bold">All Prices</p>
      {/* <div>{renderPrices()}</div> */}

      <div className="container mx-auto p-4">
        {" "}
        {/* Added container for centering */}
        <h1 className="text-2xl font-bold mb-4 text-center">
          All Cryptocurrency Prices
        </h1>{" "}
        {/* Improved heading */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {" "}
          {/* Responsive grid */}
          {Object.entries(prices).map(([key, value]) => (
            <div
              key={key}
              className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] text-white rounded-lg p-4  border border-blue-500/30 hover:scale-105 transition-transform duration-200 shadow-lg " // Added styling
            >
              <p className="text-lg font-medium">{key}</p>{" "}
              {/* Improved typography */}
              <p className="text-gray-600">{formatPrice(value)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
