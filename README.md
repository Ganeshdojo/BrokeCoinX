# BrokeCoinX - Cryptocurrency Tracking Application

A modern, responsive cryptocurrency tracking application built with React that provides real-time market data, detailed coin analytics, and interactive charts powered by TradingView.

## Features

### **Home Dashboard**
- **Global Market Overview**: Total market cap, volume, BTC dominance, and active coins
- **Top Cryptocurrencies Table**: Real-time data with sorting capabilities
- **Interactive Sparklines**: 7-day price charts for each cryptocurrency
- **Search Functionality**: Find coins by name or symbol
- **Responsive Design**: Optimized for all device sizes

### **Coin Details Modal**
- **Comprehensive Coin Information**: Price, 24h change, market cap, supply
- **Interactive Sparkline Charts**: 7-day price visualization
- **Watchlist Integration**: Add/remove coins to personal watchlist
- **Chart Navigation**: Direct access to detailed TradingView charts

### **Watchlist Management**
- **Personal Coin Collection**: Save your favorite cryptocurrencies
- **Persistent Storage**: Data saved in localStorage
- **Quick Actions**: Clear all or individual coin management
- **Real-time Updates**: Live price and change data

### **Advanced Charting**
- **TradingView Integration**: Professional-grade trading charts
- **Multiple Timeframes**: Daily, weekly, and custom intervals
- **Technical Indicators**: Full suite of trading tools
- **Responsive Charts**: Optimized for mobile and desktop

### **Search & Navigation**
- **Smart Search**: Find coins instantly with real-time filtering
- **Modal Interface**: Clean, full-height search experience
- **Quick Results**: Instant coin discovery and navigation

## Technology Stack

- **Frontend**: React 18 with Hooks
- **Styling**: CSS3 with CSS Variables and Flexbox/Grid
- **Charts**: TradingView Widgets
- **Data**: CoinGecko API (with mock data fallback)
- **State Management**: React Context API
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/BrokeCoinX.git
   cd BrokeCoinX
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
```

## Mobile-First Design

### **Responsive Features**
- **Bottom Navigation**: Mobile-optimized sidebar with icons
- **Touch-Friendly**: Optimized touch targets and gestures
- **Horizontal Scrolling**: Full table data accessible on mobile
- **Adaptive Layouts**: Dynamic content organization
- **Search Modal**: Full-height mobile search experience

### **Breakpoints**
- **Desktop**: > 768px
- **Tablet**: ≤ 768px
- **Mobile**: ≤ 480px

## Design System

### **Color Palette**
```css
--color-yellow: hsl(46, 91%, 65%)      /* Primary accent */
--color-nav-table-bg: hsl(240, 9%, 6%) /* Dark backgrounds */
--color-border: hsl(40, 18%, 13%)      /* Borders */
--color-red: hsl(3, 68%, 58%)          /* Negative changes */
--color-green: hsl(150, 40%, 52%)      /* Positive changes */
```

### **Typography**
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700, 800, 900
- **Responsive Sizing**: Adaptive font sizes for mobile

## Configuration

### **API Configuration**
The app can use either live CoinGecko API or mock data:

```javascript
// In src/contexts/GlobalContext.jsx
const USE_COINS_MOCK = false;      // Set to true for mock data
const USE_GLOBAL_MOCK = false;     // Set to true for mock data
```

### **Mock Data**
Mock data files are located in `public/mock-data/`:
- `top250Coins.json` - Cryptocurrency data
- `globalStatsData.json` - Global market statistics

## Project Structure

```
BrokeCoinX/
├── public/
│   └── mock-data/          # Mock API responses
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── common/         # Shared components
│   │   └── layout/         # Layout components
│   ├── contexts/           # React Context providers
│   ├── pages/              # Page components
│   ├── styles/             # Global styles and variables
│   └── main.jsx            # Application entry point
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
└── vite.config.js          # Vite configuration
```

## Key Components

### **Core Components**
- **Layout**: Main app structure with sidebar and navbar
- **CryptoTable**: Main cryptocurrency data table
- **CoinRow**: Individual coin row with modal
- **TradingViewChart**: Professional charting component
- **Modal**: Reusable modal system

### **State Management**
- **GlobalContext**: Centralized state for coins, search, and watchlist
- **Local Storage**: Persistent watchlist data
- **Real-time Updates**: 30-second data refresh intervals

## Data Flow

1. **API Fetch**: CoinGecko API data fetched every 30 seconds
2. **Context Update**: Data stored in React Context
3. **Component Render**: Components consume context data
4. **User Interactions**: Search, filtering, and watchlist management
5. **State Persistence**: Watchlist saved to localStorage

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- **CoinGecko**: Cryptocurrency data API
- **TradingView**: Professional charting widgets

*Built for cryptocurrency enthusiasts who want to stay ahead of the market.*
