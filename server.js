// server.js

const express = require("express");
const axios = require("axios");
const { getCache, setCache } = require("./cache");

// Function to start the proxy server
async function startServer(port, origin) {
  const app = express();

  // Handle all routes (any URL path)
  app.use(async (req, res) => {
    const cacheKey = req.originalUrl; // example: /products

    // Check if response exists in cache
    const cachedResponse = getCache(cacheKey);
    if (cachedResponse) {
      res.set("X-Cache", "HIT"); // Add header showing cache hit
      return res.status(200).send(cachedResponse);
    }

    // If not cached, fetch from origin server
    try {
      const response = await axios.get(`${origin}${req.originalUrl}`);
      const data = response.data;

      // Save to cache for next time
      setCache(cacheKey, data);

      // Add header showing cache miss
      res.set("X-Cache", "MISS");
      res.status(response.status).send(data);
    } catch (error) {
      // Handle any error from origin server
      res.status(500).send(`Error: ${error.message}`);
    }
  });

  // Start the server
  app.listen(port, () => {
    console.log(`🚀 Caching Proxy running on http://localhost:${port}`);
    console.log(`🔗 Forwarding requests to: ${origin}`);
  });
}

module.exports = startServer;
