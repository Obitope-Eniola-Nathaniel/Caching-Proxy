// Cache store: { key: { data, timestamp } }
const cache = new Map();

// TTL (in seconds)
let CACHE_TTL = 60; // default 60 seconds

function setTTL(seconds) {
  CACHE_TTL = Number(seconds);
}

// Get cache and check if expired
function getCache(key) {
  const entry = cache.get(key);
  if (!entry) return null;

  const now = Date.now();
  const age = (now - entry.timestamp) / 1000; // convert ms to seconds

  // Check if expired
  if (age > CACHE_TTL) {
    cache.delete(key);
    console.log(`⏳ Cache expired for: ${key}`);
    return null;
  }

  return entry.data;
}

// Save to cache
function setCache(key, value) {
  cache.set(key, {
    data: value,
    timestamp: Date.now(),
  });
}

// Clear all cache
function clearCache() {
  cache.clear();
}

module.exports = { getCache, setCache, clearCache, setTTL };
