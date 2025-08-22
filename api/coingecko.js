// /api/coingecko.js
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { endpoint = "global" } = req.query;

    let url;
    let params = new URLSearchParams();

    // Handle different endpoints
    switch (endpoint) {
      case "coins":
        params.set("vs_currency", "usd");
        params.set("order", "market_cap_desc");
        params.set("per_page", "250");
        params.set("page", "1");
        params.set("sparkline", "true");
        params.set("price_change_percentage", "24h");
        url = `https://api.coingecko.com/api/v3/coins/markets?${params.toString()}`;
        break;

      case "global":
        url = "https://api.coingecko.com/api/v3/global";
        break;

      default:
        return res.status(400).json({ error: "Invalid endpoint" });
    }

    const response = await fetch(url);

    if (!response.ok) {
      // Handle rate limiting specifically
      if (response.status === 429) {
        return res.status(429).json({
          error: "Rate limit exceeded",
          message: "CoinGecko API rate limit reached. Please try again later.",
        });
      }

      return res.status(response.status).json({
        error: `API request failed with status ${response.status}`,
      });
    }

    const data = await response.json();

    // Check for CoinGecko error responses
    if (data.status && data.status.error_code) {
      return res.status(400).json({
        error: "CoinGecko API error",
        details: data.status,
      });
    }

    // Cache the response for 5 minutes
    res.setHeader("Cache-Control", "public, max-age=300");
    res.status(200).json(data);
  } catch (error) {
    console.error("CoinGecko API error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to fetch data from CoinGecko",
    });
  }
}
