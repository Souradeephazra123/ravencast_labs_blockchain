Trades:
1.
2.
3.
4.time is 24 hours based


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

base
: 
"cardano"
direction
: 
"sell"
exchange
: 
"huobi"
price
: 
0.710048
priceUsd
: 
0.70994859328
quote
: 
"tether"
timestamp
: 
1742705356828
volume
: 
281.225



{
      exchangeId: 'binance',
      name: 'Binance',
      rank: '1',
      percentTotalVolume: '37.315687163270764328000000000000000000',
      volumeUsd: '4515431439.0025197138383246',
      tradingPairs: '770',
      socket: true,
      exchangeUrl: 'https://www.binance.com/',
      updated: 1742721212339
    },