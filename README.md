# 📦 Caching Proxy Server

A simple CLI-based **caching proxy server** built with Node.js.
The proxy forwards incoming requests to an **origin server**, caches the response, and returns it faster on repeated requests.

This project helps you understand:

- How proxies work
- How caching works
- CLI tools in Node.js
- Express middleware
- Cache expiration (TTL)
- Logging (HIT/MISS/EXPIRED)

---

## 🚀 Features

### ✅ Caching Proxy

Forwards requests and caches their responses.

### ✅ Cache HIT / MISS Headers

- `X-Cache: HIT` → Returned from cache
- `X-Cache: MISS` → Fetched from origin

### ✅ Cache Expiration (TTL)

Cached responses automatically expire after `TTL` seconds.

### ✅ CLI Tool

Run the proxy using:

```bash
caching-proxy --port 3000 --origin http://dummyjson.com
```

### ✅ Clear Cache Command

```bash
caching-proxy --clear-cache
```

### ✅ Logging

See all requests in the terminal:

- HIT
- MISS
- EXPIRED

---

# 🛠️ Installation & Setup

### 1. Clone the project

```bash
git clone <your-repo-url>
cd caching-proxy
```

### 2. Install dependencies

```bash
npm install
```

### 3. Link the CLI tool

Allows you to run `caching-proxy` globally.

```bash
npm link
```

---

# ▶️ Usage

## **Start the Proxy Server**

```bash
caching-proxy --port <number> --origin <url>
```

### Example:

```bash
caching-proxy --port 3000 --origin http://dummyjson.com
```

Now visit:

```
http://localhost:3000/products
```

Result:

- First request → MISS
- Second request → HIT

---

## 💾 Cache Expiration (TTL)

Use the `--ttl` option:

```bash
caching-proxy --port 3000 --origin http://dummyjson.com --ttl 20
```

This sets the cache expiration to **20 seconds**.

After 20 seconds:

- Cached value expires
- New request becomes a **MISS** again

---

## 🧹 Clear the Cache

Run:

```bash
caching-proxy --clear-cache
```

Output:

```
🧹 Cache cleared successfully!
```

---

# 📁 Project Structure

```
caching-proxy/
│
├── index.js       # CLI entry file
├── server.js      # Proxy server logic
├── cache.js       # Cache logic + TTL
├── package.json
└── README.md
```

---

# 🧠 How It Works (Simple Explanation)

1. You send a request → `/products`
2. Proxy checks if data is cached
3. If **not cached**:

   - Fetch from origin
   - Cache the response
   - Respond with `X-Cache: MISS`

4. If **cached**:

   - Return cached data
   - Respond with `X-Cache: HIT`

5. If TTL expired:

   - Delete old cached version
   - Fetch new data
   - Respond with `MISS`

---

# 🧪 Example Request Flow

### First request:

```
GET /products
Header: X-Cache: MISS
```

### Second request (same URL):

```
GET /products
Header: X-Cache: HIT
```

### After TTL expires:

```
GET /products
Header: X-Cache: MISS
```

---

# 🧰 Technologies Used

- Node.js
- Express
- Axios
- Commander (CLI)
- In-memory caching
- JavaScript (ES5/ES6)

---

# 🤝 Contributing

1. Fork the repo
2. Create a new branch
3. Make your changes
4. Submit a pull request

---

# 📄 License

MIT License © 2025

