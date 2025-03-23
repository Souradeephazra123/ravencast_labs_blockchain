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

  console.log("shortTermPrices", averagesSMAPrice);

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

  //   useEffect(() => {
  //     const smaPrice = averagesSMAPrice();
  //     if (SMACalmap.has("averagesSMAPrice")) {
  //       SMACalmap.set("averagesSMAPrice", formatPrice(smaPrice));
  //     } else {
  //       SMACalmap.set("averagesSMAPrice", formatPrice(smaPrice));
  //     }

  //     const lmaPrice = averageLongPrice();
  //     if (SMACalmap.has("averageLongPrice")) {
  //       SMACalmap.set("averageLongPrice", formatPrice(lmaPrice));
  //     } else {
  //       SMACalmap.set("averageLongPrice", formatPrice(lmaPrice));
  //     }
  //   }, [prices]);

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
    <div className=" p-7">
      <p>Prices</p>

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
                className="bg-white rounded-lg shadow-md p-4" // Added styling
              >
                <p className="text-lg font-medium">{key}</p>{" "}
                {/* Improved typography */}
                <p className="text-gray-600">{formatPrice(value)}</p>
              </div>
            ))}
        </div>
      </div>

      <div className="flex justify-center items-center ">
        <Link
          href="/allprices"
          className=" w-fit text-center bg-blue-300 p-2 rounded"
        >
          See all Prices
        </Link>
      </div>
      <div className=" flex flex-col  gap-4">
        <p className=" text-xl font-bold">SMA Calculation:</p>
        <div className=" flex gap-16  items-center">
          <div>
            <h1 className="flex gap-5">
              SMA Calculation: {formatPrice(averagesSMAPrice())}{" "}
            </h1>
            <h1 className="flex gap-2">
              LMA Calculation: {formatPrice(averageLongPrice())}{" "}
            </h1>
          </div>

          <button className={`flex gap-3 font-bold border-2 rounded-lg p-2`}>
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
        <Link href={"/trades"} className="text-xl bg-amber-300 rounded p-2">
          See trades here
        </Link>
      </div>  
    </div>
  );
};

export default Prices;
