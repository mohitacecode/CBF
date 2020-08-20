const hostname = process.env.REACT_APP_CHAT_MODULE ? "gaadibaazar.in" : window.location.hostname;
const Constants = {
  baseUrl: process.env.REACT_APP_CHAT_MODULE
    ? process.env.REACT_APP_API_URL
    : `${window.location.origin}/`,
  wsBaseUrl: process.env.NODE_ENV === "development" ? window.location.host : `${hostname}:8001`,
};

// console.log("baseUrl>", Constants.baseUrl);
// console.log("wsBaseUrl>", Constants.wsBaseUrl);

Constants.api = {
  baseUrl: Constants.baseUrl + "api",
  websocketBaseUrl: process.env.REACT_APP_WS_URL,
};

Constants.mimeTypeFormat = {
  formate: "image/jpeg,image/png,application/pdf",
};

Constants.table = {
  pageSize: 15,
  pageSizeOptions: [5, 10, 20, 30, 40, 50],
};
export default Constants;
