import Prices from "@/components/Prices";
import Image from "next/image";
import { getAssets } from "./action";

export default async function Home() {
  const Assets=await getAssets();
  console.log(Assets);
  return (
    <div className="globalbg globaltext">
      <Prices assets={Assets} />
    </div>
  );
}
