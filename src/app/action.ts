"use server";

interface Asset {
  id: string;
  rank: number;
  symbol: string;
  name: string;
  supply: number;
  maxSupply: number | null;
  marketCapUsd: number;
  volumeUsd24Hr: number;
  priceUsd: number;
  changePercent24Hr: number;
  vwap24Hr: number;
}

export async function getAssets() {
  const res = await fetch("https://api.coincap.io/v2/assets?limit=20");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const resultArr = await res.json();
  return resultArr?.data?.map((asset) => asset.id);
}

export async function getExchanges(){
  const res = await fetch("https://api.coincap.io/v2/exchanges?limit=20");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const resultArr = await res.json();

  return resultArr?.data;
}
