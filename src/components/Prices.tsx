"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Prices = ({ assets }) => {
  const [prices, setPrices] = useState({});

  const SMACalmap = new Map();

  const [prevSMA, setPrevSMA] = useState(null);
  const [prevLMA, setPrevLMA] = useState(null);
  const [currentSMA, setCurrentSMA] = useState(null);
  const [currentLMA, setCurrentLMA] = useState(null);

  useEffect(() => {
    const pricesWs = new WebSocket(
      `wss://ws.coincap.io/prices?assets=${assets.join(",")}`
    );

    pricesWs.onmessage = function (msg) {
      const data = JSON.parse(msg.data);
      console.log("data", data);
      setPrices((prevPrices) => ({ ...prevPrices, ...data }));
    };

    return () => {
      pricesWs.close();
    };
  }, [assets]);

  const formatPrice = (price) => {
    if (!price || Number.isNaN(Number(price))) return "N/A"; // Handle invalid prices

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2, // Consistent decimal places
      maximumFractionDigits: 6, // Handle price variations. Consider dynamic precision based on price magnitude
    }).format(price);
  };

  const shortTermPrices = Object.entries(prices)
    .slice(0, 5)
    .reduce((acc, [key, value]) => {
      acc[key] = parseFloat(value);
      return acc;
    }, {});

  const averagesSMAPrice = () => {
    const values = Object.values(shortTermPrices);
    const sum = values.reduce((acc, value) => acc + value, 0);
    return values.length ? sum / values.length : 0;
  };

  const longTermPrices = Object.entries(prices)
    .slice(0, 19)
    .reduce((acc, [key, value]) => {
      acc[key] = parseFloat(value);
      return acc;
    }, {});

  const averageLongPrice = () => {
    const values = Object.values(longTermPrices);
    const sum = values.reduce((acc, value) => acc + value, 0);
    return values.length ? sum / values.length : 0;
  };

  useEffect(() => {
    const smaPrice = averagesSMAPrice();
    const lmaPrice = averageLongPrice();

    setPrevSMA(currentSMA);
    setPrevLMA(currentLMA);

    setCurrentSMA(smaPrice);
    setCurrentLMA(lmaPrice);
  }, [prices]);

  const getChangeIndicator = (prev, current) => {
    if (prev === null || current === null) return null;
    if (current > prev) {
      return <Image src={"/buy.svg"} alt="buy" width={30} height={30} />;
    } else if (current < prev) {
      return <Image src={"/sell.svg"} alt="sell" width={30} height={30} />;
    } else {
      return <span style={{ color: "gray" }}>→</span>;
    }
  };

  const showChangeIndicator = (lma, sma) => {
    if (lma === null || sma === null) return null;
    if (sma > lma) {
      return <Image src={"/buy.svg"} alt="buy" width={30} height={30} />;
    } else if (sma < lma) {
      return <Image src={"/sell.svg"} alt="sell" width={30} height={30} />;
    } else {
      return <span style={{ color: "gray" }}>→</span>;
    }
  };

  return (
    <div className=" p-7 globalbgtext bg-gradient-to-r from-[#0d142100] via-black to-[#0D1421] min-h-screen">
      <header className="bg-black text-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-wide text-blue-400"
          >
            CryptoTracker 🚀
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex gap-16">
            <Link
              href="/"
              className="hover:text-blue-400 transition duration-200"
            >
              Home
            </Link>
            <Link
              href="/prices"
              className="hover:text-blue-400 transition duration-200"
            >
              Prices
            </Link>
            <Link
              href="/trades"
              className="hover:text-blue-400 transition duration-200"
            >
              Trades
            </Link>
            
          </nav>

          
          <Link
            href="/"
            className="bg-blue-500 px-4 py-2 rounded-lg font-bold shadow-md hover:scale-105 hover:bg-blue-600 transition-all"
          >
           Let's Explore
          </Link>
        </div>
      </header>

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
          {Object.entries(prices)
            .slice(0, 20)
            .map(([key, value]) => (
              <div
                key={key}
                className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] text-white rounded-lg p-4  border border-blue-500/30 hover:scale-105 transition-transform duration-200 shadow-lg " // Added styling
              >
                <p className="text-xl font-semibold tracking-wide">{key}</p>{" "}
                {/* Improved typography */}
                <p className="text-green-400">{formatPrice(value)}</p>
              </div>
            ))}
        </div>
      </div>

      <div className="flex justify-center items-center ">
        <Link
          href="/allprices"
          className=" w-fit text-center bg-blue-300 p-2  bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-lg font-bold shadow-md 
    hover:scale-105 hover:shadow-lg transition-all duration-200"
        >
          See all Prices
        </Link>
      </div>
      <div className="bg-[#1E1E1E] flex flex-col  gap-4 p-4 rounded-lg shadow-md">
        <p className=" text-xl font-bold text-white">SMA Calculation:</p>
        <div className=" flex gap-16  items-center">
          <div>
            <h1 className="flex gap-5">
              SMA Calculation:{" "}
              <span className="text-blue-400">
                {formatPrice(averagesSMAPrice())}
              </span>{" "}
            </h1>
            <h1 className="flex gap-2">
              LMA Calculation:{" "}
              <span className="text-yellow-400">
                {" "}
                {formatPrice(averageLongPrice())}
              </span>{" "}
            </h1>
          </div>

          <button
            className={`flex gap-3 font-bold border-2 rounded-lg p-2  ${
              formatPrice(averageLongPrice()) > formatPrice(averagesSMAPrice())
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }
        transition-all duration-200 shadow-md`}
          >
            {formatPrice(averageLongPrice()) > formatPrice(averagesSMAPrice())
              ? "Sell"
              : "Buy"}
            {showChangeIndicator(
              formatPrice(averageLongPrice()),
              formatPrice(averagesSMAPrice())
            )}
          </button>
        </div>
      </div>
      <div className=" flex justify-center items-center mt-4">
        <Link
          href={"/trades"}
          className="text-xl p-2 bg-amber-400 px-6 py-2 rounded-lg font-bold shadow-md text-black
    hover:scale-105 hover:shadow-lg transition-all duration-200"
        >
          See trades here
        </Link>
      </div>
    </div>
  );
};

export default Prices;
