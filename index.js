const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
  "/proxy",
  createProxyMiddleware({
    target: "https://chat.openai.com",
    changeOrigin: true,
    headers: {
      "X-Frame-Options": "ALLOWALL",
    },
    onProxyRes(proxyRes) {
      proxyRes.headers["X-Frame-Options"] = "ALLOWALL";

      // Check if the request URL contains 'challenge-platform'
      if (proxyRes.req.path.includes("challenge-platform")) {
        // Set the 'Content-Type' header to 'application/javascript'
        proxyRes.headers["Content-Type"] = "application/javascript";
      }
    },
  })
);
app.use(
  "/proxy/js",
  createProxyMiddleware({
    target: "https://chat.openai.com",
    changeOrigin: true,
    headers: {
      "X-Frame-Options": "ALLOWALL",
    },
    onProxyRes(proxyRes) {
      proxyRes.headers["X-Frame-Options"] = "ALLOWALL";

      // Set the 'Content-Type' header to 'application/javascript'
      proxyRes.headers["Content-Type"] = "application/javascript";
    },
  })
);

app.use(express.static("public"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
