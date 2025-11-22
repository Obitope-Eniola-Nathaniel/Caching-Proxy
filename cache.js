// We’ll store all cached data in a Map (key-value store)
const cache = new Map();

// Function to get data from cache
function getCache(key) {
  return cache.get(key);
}

// Function to save data into cache
function setCache(key, value) {
  cache.set(key, value);
}

// Function to clear all cached data
function clearCache() {
  cache.clear();
}

// Export these functions so other files can use them
module.exports = { getCache, setCache, clearCache };
