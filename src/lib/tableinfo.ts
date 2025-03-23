export const AllTrades = [
    { id: "1", label: "Rank" },
  { id: "2", label: "Name" },
  { id: "3", label: "ExchangeId" },
  { id: "4", label: "TotalVolume(%)" },
  { id: "5", label: "VolumeUsd" },
  { id: "6", label: "TradingPairs" },
  { id: "7", label: "ExchangeUrl" },
  { id: "8", label: "UpdatedAt" },
];

export const tradeColumns = [
    { id: "1", label: "Name" },
    { id: "2", label: "Base" },
    { id: "3", label: "Price(USD)" },
    { id: "4", label: "Type (Buy/Sell)" },
    { id: "5", label: "Quote" },
    { id: "6", label: "Quantity" },
    { id: "7", label: "Timestamp" },
  ];
export const toISTDate = (dt: Date): string => {
  const date = dt.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return date;
};


export const toISTTime = (dt: Date): string => {
    const time = dt.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
    if (time === "24:00") return "00:00";
    return time;
  };