Cryptocurrency Price Tracker

📌 Project Overview

This project is a Cryptocurrency Price Tracker that displays real-time cryptocurrency prices, calculates moving averages (SMA & LMA), and provides trade recommendations based on price trends.

The application efficiently handles data using a circular buffer (deque) approach to maintain only the most recent 5 and 20 prices for SMA calculations, ensuring constant-time updates.

🚀 Setup Instructions

1️⃣ Prerequisites

Ensure you have the following installed:

Node.js (v16 or later)

npm or yarn

2️⃣ Clone the Repository

  git clone <repository-url>
  cd cryptocurrency-price-tracker

3️⃣ Install Dependencies

Using npm:

npm install

Using yarn:

yarn install

4️⃣ Run the Application

To start the development server:

npm run dev

or

yarn dev

The application will be available at http://localhost:3000.

🛠️ Design Decisions

Efficient Data Handling

Implemented a circular buffer (deque) approach to store only the last 5 and 20 prices for SMA calculations.

This ensures that older values are automatically removed without unnecessary memory usage.

Responsive UI

Used Tailwind CSS for styling.

Implemented a grid layout to display prices efficiently across different screen sizes.

Trading Signals

If LMA > SMA, the application suggests SELL.

If SMA > LMA, the application suggests BUY.

📂 Project Structure

📦 cryptocurrency-price-tracker
├── 📁 components      # Reusable UI components
├── 📁 pages           # Next.js pages (Landing Page, Trades, Prices, etc.)
├── 📁 styles          # Global styles
├── 📜 README.md       # Project documentation
├── 📜 package.json    # Project dependencies and scripts
└── ...

📜 Assumptions

The cryptocurrency price data comes from a reliable external API.

Prices are updated at a fixed interval (e.g., every few seconds).

The app only tracks a limited number of cryptocurrencies (e.g., top 20 by market cap).

The trade signals (BUY/SELL) are based on simple moving average (SMA) crossovers.

📎 Submission Guidelines

Repository: GitHub Repository Link

Complete Source Code: Available in the repository.

Documentation: This README.md includes:

Setup and installation instructions.

Steps to run the application.

Explanation of design decisions and assumptions.

🎯 Future Enhancements

Add real-time WebSocket updates for live price tracking.

Implement user authentication for personalized tracking.

Include more advanced technical indicators (e.g., RSI, MACD).

💡 Author

[Your Name] – Software Developer at JS Tigers 🚀









