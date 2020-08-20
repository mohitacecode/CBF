const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    proxy("/api", { target: process.env.REACT_APP_API_URL, secure: false, changeOrigin: true })
  );
  app.use(proxy("/ws", { target: process.env.REACT_APP_WS_URL, ws: true, secure: false }));
};
