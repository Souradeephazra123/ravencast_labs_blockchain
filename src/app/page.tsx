import Prices from "@/components/Prices";
import Image from "next/image";
import { getAssets } from "./action";

export default async function Home() {
  const Assets=await getAssets();
  console.log(Assets);
  return (
    <div>
      <header>Live cryptocurrency price data</header>
      <Prices assets={Assets} />
    </div>
  );
}
