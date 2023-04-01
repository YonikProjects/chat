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
    },
  })
);

app.use(express.static("public"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
