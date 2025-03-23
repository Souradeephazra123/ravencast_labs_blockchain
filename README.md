# Cryptocurrency Price Tracker

📌 **Project Overview**

This project is a Cryptocurrency Price Tracker that displays real-time cryptocurrency prices, calculates moving averages (SMA & LMA), and provides trade recommendations based on price trends.

The application efficiently handles data using a circular buffer (deque) approach to maintain only the most recent 5 and 20 prices for SMA calculations, ensuring constant-time updates.

## 🚀 Setup Instructions

### 1 Prerequisites

Ensure you have the following installed:

- Node.js (v16 or later)
- npm or yarn

### 2️ Clone the Repository

```bash
git clone <repository-url>
cd cryptocurrency-price-tracker
```

### 3 Clone the Repository

#### Using npm:

```bash
npm install
```

#### Using yarn

```bash
yarn install
```

### 4 Run the Application

To start the development server:

```bash
npm run dev
```

or

```bash
yarn dev dev
```


The application will be available at [http://localhost:3000].


  🛠️ **Design Decisions** 
### Efficient Data Handling
Implemented a circular buffer (deque) approach to store only the last 5 and 20 prices for SMA calculations. This ensures that older values are automatically removed without unnecessary memory usage.

### Responsive UI
Used Tailwind CSS for styling. Implemented a grid layout to display prices efficiently across different screen sizes.

#### _Trading Signals_
* If LMA > SMA, the application suggests SELL.
* If SMA > LMA, the application suggests BUY.

## 📂 Project Structure

```bash
📦 cryptocurrency-price-tracker
├── 📁 components      # Reusable UI components
├── 📁 pages           # Next.js pages (Landing Page, Trades, Prices, etc.)
├── 📁 styles          # Global styles
├── 📜 README.md       # Project documentation
├── 📜 package.json    # Project dependencies and scripts
└── ...
```


## _📜 Assumptions_
* The cryptocurrency price data comes from a reliable external API.
* Prices are updated at a fixed interval (e.g., every few seconds).
* The app only tracks a limited number of cryptocurrencies (e.g., top 20 by market cap).
* The trade signals (BUY/SELL) are based on simple moving average (SMA) crossovers.



## 🎯 Future Enhancements

* Add real-time WebSocket updates for live price tracking.

* Implement user authentication for personalized tracking.

* Include more advanced technical indicators (e.g., RSI, MACD).

💡 Author

[Souradeep Hazra] – Software Developer at JS Tigers 🚀