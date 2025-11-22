#!/usr/bin/env node

const { program } = require("commander");
const startServer = require("./server");
const { clearCache, setTTL } = require("./cache");

// Define CLI options
program
  .option("--port <number>", "Port to run proxy server on")
  .option("--origin <url>", "Origin server URL")
  .option("--clear-cache", "Clear cached data")
  .option("--ttl <seconds>", "Cache expiration time in seconds");

// Parse CLI arguments
program.parse(process.argv);
const options = program.opts();

// If TTL provided, configure it
if (options.ttl) {
  setTTL(options.ttl);
  console.log(`⏱️ Cache TTL set to ${options.ttl} seconds`);
}

// If user wants to clear cache
if (options.clearCache) {
  clearCache();
  console.log("🧹 Cache cleared successfully!");
  process.exit(0);
}

// If missing required options
if (!options.port || !options.origin) {
  console.error("❌ Please provide both --port and --origin options.");
  process.exit(1);
}

// Start the proxy server
startServer(options.port, options.origin);
