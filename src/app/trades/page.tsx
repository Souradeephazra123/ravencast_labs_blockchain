import Trades from '@/components/Trades';
import React from 'react'
import { getExchanges } from '../action';

const page = async({searchParams}) => {
  const {trade} = searchParams;

  console.log("trade", trade);
    const Exchanges=await getExchanges();
  return (
    <div className=' globalbg globaltext'><Trades assets={Exchanges} trade={trade ?? ""}/></div>
  )
}

export default page