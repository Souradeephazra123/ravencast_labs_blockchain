"use client";

import React, { useEffect, useState } from "react";
import debounce from "debounce";
import { Cell, Row } from "react-aria-components";
import MainTable from "./ui/table";
import { AllTrades, toISTDate, toISTTime, tradeColumns } from "@/lib/tableinfo";
import { IoClose } from "react-icons/io5";
import Image from "next/image";

interface Trade {
  base: string;
  direction: string;
  exchange: string;
  price: number;
  priceUsd: number;
  quote: string;
  timestamp: number;
  volume: number;
}
[];

const Trades = ({ assets, trade }) => {
  console.log("all trades", assets);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [lastTrade, setLastTrade] = useState(null);
  const [isTradeOpen, setIsTradesOpen] = useState<boolean>(false);
  useEffect(() => {
    let pricesWs;
    if (trade) {
      pricesWs = new WebSocket(`wss://ws.coincap.io/trades/${trade}`); // Use the trade prop to connect to the specific exchange
    } else {
      pricesWs = new WebSocket(`wss://ws.coincap.io/trades/huobi`);
    }

    // pricesWs.onmessage = (msg) => {
    //   const newTrade = JSON.parse(msg.data);
    //   setLastTrade(newTrade); // Store the latest trade
    //   console.log("New Trade:", newTrade);

    //   // Simulate trade execution based on the received trade
    //   simulateTradeExecution(newTrade);
    // };
    const handleTrade = (msg) => {
      const newTrade = JSON.parse(msg.data);
      setLastTrade(newTrade); // Store the latest trade

      // Simulate trade execution based on the received trade
      simulateTradeExecution(newTrade);
    };

    const debounceFunction = debounce(handleTrade, 200); // Debounce the function to limit execution rate

    pricesWs.onmessage = debounceFunction;

    return () => {
      pricesWs.close();
      //   window.onresize.clear();
      debounceFunction.clear(); // Cancel the debounce on cleanup
    };
  }, [assets]);

  const simulateTradeExecution = (trade: Trade) => {
    if (trade?.volume > 100) {
      executeTrade(
        trade.base,
        trade.priceUsd,
        trade.direction,
        trade.quote,
        trade.timestamp,
        trade.volume,
        trade.exchange
      ); // Example: buy 1 BTC
    } else {
      executeTrade(
        trade.base,
        trade.priceUsd,
        trade.direction,
        trade.quote,
        trade.timestamp,
        trade.volume,
        trade.exchange
      ); // Example: sell 1 ETH
    }
  };

  const executeTrade = (
    base: string,
    price: number,
    type: string,
    quote: string,
    timestamp: number,
    quantity: number,
    name: string
  ) => {
    const time = new Date(timestamp).toISOString();
    const trade = {
      exchange: name,
      base,
      price,
      timestamp: time,
      direction: type,
      quote,
      volume: quantity,
    };
    setTrades((prevTrades) => {
      const updateTrades = [trade, ...prevTrades];
      if (updateTrades.length > 100) {
        updateTrades.pop();
      }
      return updateTrades;
    }); // Add to trade history
  };

  const formatPrice = (price: number) => {
    if (!price || Number.isNaN(Number(price))) return "N/A"; // Handle invalid prices

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 6, // Handle price variations. Consider dynamic precision based on price magnitude
    }).format(price);
  };

  return (
    <div className=" p-7  globalbgtext bg-gradient-to-r from-[#0d142100] via-black to-[#0D1421] min-h-screen">
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          {/* Optionally add a crypto icon or brand logo here */}
          <Image
            src={"/bitcoin-btc-logo.svg"}
            alt="Crypto Logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <h1 className="text-2xl font-bold tracking-wide">
            Crypto Trades Dashboard
          </h1>
        </div>
        <span className="bg-green-500 text-sm px-2 py-1 rounded-full animate-pulse">
          LIVE
        </span>
      </header>
      <p className=" text-2xl text-center font-bold">Trades</p>

      <div>
        <div className=" flex gap-5 items-center ">
          <p className=" text-2xl font-bold">Name : {trade ?? "huobi"} </p>
          <p
            className=" text-sm text-blue-400 cursor-pointer"
            onClick={() => setIsTradesOpen(true)}
          >
            See other trade also
          </p>
        </div>
        <h2 className="text-xl font-bold mb-2">Last Trade</h2>
        {lastTrade && (
          <pre className="bg-transparent p-2 rounded-md overflow-x-auto">
            {JSON.stringify(lastTrade, null, 2)} {/* Display last trade data */}
          </pre>
        )}

        <h2 className="text-xl font-bold mt-4 mb-2">Trade History</h2>

        <div className="w-full overflow-x-scroll [scrollbar-width:thin] bg-transparent">
          <div className="min-w-full">
            <MainTable
              columns={tradeColumns}
              columnClassName="py-0 text-center"
              style={{ marginBottom: "10px", marginTop: "10px" }}
            >
              <>
                {trades?.map((trade, index) => {
                  return (
                    <Row key={index} className="border-b">
                      <Cell className="py-2 pl-2 text-center">
                        {trade.exchange}
                      </Cell>
                      <Cell className=" pl-2 text-center min-w-36">
                        {trade.base}
                      </Cell>

                      <Cell className=" pl-2 text-center min-w-40">
                        {formatPrice(trade.price)}
                      </Cell>
                      <Cell className=" pl-2 text-center min-w-40">
                        {trade.direction === "buy" ? (
                          <span className="text-green-500 font-semibold">
                            {trade.direction}
                          </span>
                        ) : (
                          <span className="text-red-500 font-semibold">
                            {trade.direction}
                          </span>
                        )}
                      </Cell>
                      <Cell className=" pl-2 min-w-36 text-center">
                        {trade.quote}
                      </Cell>
                      <Cell className=" pl-2 min-w-36 text-center">
                        {trade.volume}
                      </Cell>
                      <Cell className=" pl-2 min-w-36 text-center">
                        {toISTDate(new Date(trade.timestamp))} &nbsp;{" "}
                        {toISTTime(new Date(trade.timestamp))}
                      </Cell>
                    </Row>
                  );
                })}
              </>
            </MainTable>
          </div>
        </div>
      </div>
      {isTradeOpen && (
        <div
          id="modal"
          className="fixed inset-0   backdrop-blur-xs flex items-center justify-center z-50 h-[100vh] overflow-y-auto"
        >
          <div className="bg-white p-4 shadow-lg max-h-[80vh] overflow-y-auto rounded-lg max-w-[80vw] bg-opacity-90">
            <div className=" flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold mb-2">List of Trades</h2>
              <IoClose
                size={25}
                color="black"
                onClick={() => setIsTradesOpen(false)}
                className=" cursor-pointer"
              />
            </div>

            <div className="w-full overflow-x-scroll [scrollbar-width:thin]">
              <div className="min-w-full">
                <MainTable
                  columns={AllTrades}
                  columnClassName="py-0 text-center"
                  style={{ marginBottom: "10px", marginTop: "10px" }}
                >
                  <>
                    {assets?.map((trade, index) => {
                      return (
                        <Row
                          onAction={() => setIsTradesOpen(false)}
                          key={index}
                          className="border-b cursor-pointer"
                          href={`/trades?trade=${trade.exchangeId}`}
                        >
                          <Cell className=" pl-2 text-center">
                            {trade.rank}
                          </Cell>
                          <Cell className="py-2 pl-2 text-center">
                            {trade.name}
                          </Cell>

                          <Cell className=" pl-2 text-center ">
                            {trade.exchangeId}
                          </Cell>
                          <Cell className=" pl-2 text-center min-w-40">
                            {Number(trade.percentTotalVolume).toFixed(2)}%
                          </Cell>
                          <Cell className=" pl-2 min-w-36 text-center">
                            {Number(trade.volumeUsd).toFixed(2)}
                          </Cell>
                          <Cell className=" pl-2 text-center">
                            {trade.tradingPairs}
                          </Cell>
                          <Cell className=" pl-2 min-w-36 text-center cursor cursor-pointer">
                            {/* <Link target="_blank" href={trade.exchangeUrl}>
                                explore
                              </Link> */}
                            {trade.exchangeUrl}
                          </Cell>
                          <Cell className=" pl-2 min-w-36 text-center">
                            {toISTDate(new Date(trade.updated))} &nbsp;{" "}
                            {toISTTime(new Date(trade.updated))}
                          </Cell>
                        </Row>
                      );
                    })}
                  </>
                </MainTable>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trades;
