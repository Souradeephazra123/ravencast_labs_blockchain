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
    <div>
      <p>Prices</p>
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
              className="bg-white rounded-lg shadow-md p-4" // Added styling
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
