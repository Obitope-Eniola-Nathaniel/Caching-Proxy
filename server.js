// server.js

const express = require("express");
const axios = require("axios");
const { getCache, setCache } = require("./cache");

async function startServer(port, origin) {
  const app = express();

  app.use(async (req, res) => {
    const cacheKey = req.originalUrl;

    // Check cache
    const cachedResponse = getCache(cacheKey);
    if (cachedResponse) {
      console.log("CACHE HIT:", cacheKey);
      res.setHeader("X-Cache", "HIT");
      return res.status(200).send(cachedResponse);
    }

    // Fetch from origin
    try {
      const response = await axios.get(`${origin}${req.originalUrl}`);
      const data = response.data;

      setCache(cacheKey, data);

      console.log("CACHE MISS:", cacheKey);
      res.setHeader("X-Cache", "MISS");
      res.status(response.status).send(data);
    } catch (err) {
      res.status(500).send("Error: " + err.message);
    }
  });

  app.listen(port, () => {
    console.log(`🚀 Caching Proxy running on http://localhost:${port}`);
    console.log(`🔗 Forwarding to: ${origin}`);
  });
}

module.exports = startServer;
