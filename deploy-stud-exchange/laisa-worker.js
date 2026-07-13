/**
 * LAISA Agent OS - Cloudflare Worker
 * Proxies and caches static files from the LAISA demo
 * with proper routing for stud.exchange
 */
const ORIGIN = "https://wpkuimu7y7gy.space.minimax.io";
const DEMO_ORIGIN = "https://78jccbd42jnj.space.minimax.io"; // proposal
const CACHE_TTL = 60 * 30; // 30 minutes

// Static file extensions to cache
const STATIC_EXTENSIONS = new Set([
  '.html', '.css', '.js', '.json', '.xml',
  '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico',
  '.woff', '.woff2', '.ttf', '.eot', '.webp'
]);

async function fetchAndCache(request) {
  const url = new URL(request.url);
  const cacheKey = `https://stud.exchange${url.pathname}`;
  
  // Try KV cache first
  const cache = caches.default;
  const cached = await cache.match(cacheKey);
  if (cached) {
    // Refresh in background
    fetch(request).then(r => {
      if (r.ok) cache.put(cacheKey, r);
    }).catch(() => {});
    return cached;
  }
  
  // Fetch from origin with correct host
  const originReq = new Request(ORIGIN + url.pathname, request);
  originReq.headers.set("Host", "wpkuimu7y7gy.space.minimax.io");
  
  try {
    const response = await fetch(originReq);
    if (response.ok) {
      // Clone and cache
      const cloned = response.clone();
      const cacheRes = new Response(cloned.body, {
        headers: cloned.headers,
        status: cloned.status
      });
      cache.put(cacheKey, cacheRes);
      return response;
    }
    return response;
  } catch (err) {
    return new Response("Service temporarily unavailable", {
      status: 503,
      headers: { "Content-Type": "text/plain" }
    });
  }
}

async function handleRequest(request) {
  const url = new URL(request.url);
  
  // API proxy
  if (url.pathname.startsWith("/api/")) {
    const apiUrl = new URL(url.pathname + url.search, ORIGIN);
    const proxyReq = new Request(apiUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      cf: { cacheTtl: 0 }
    });
    return fetch(proxyReq);
  }
  
  // Main page proxy with caching
  if (url.pathname === "/" || url.pathname === "/index.html") {
    return fetchAndCache(request);
  }
  
  // Static assets - aggressive caching
  const ext = url.pathname.substring(url.pathname.lastIndexOf("."));
  if (STATIC_EXTENSIONS.has(ext)) {
    const cache = caches.default;
    const cached = await cache.match(request.url);
    if (cached) return cached;
    
    const originReq = new Request(ORIGIN + url.pathname, request);
    const response = await fetch(originReq);
    if (response.ok) {
      const cloned = response.clone();
      const cacheRes = new Response(cloned.body, {
        headers: { ...Object.fromEntries(cloned.headers), "Cache-Control": "public, max-age=86400" }
      });
      cache.put(request.url, cacheRes);
    }
    return response;
  }
  
  // Default: fetch with cache
  return fetchAndCache(request);
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

addEventListener("scheduled", event => {
  // Optional: pre-warm cache every 30 minutes
  event.waitUntil(fetch(ORIGIN + "/").then(r => r.text()));
});