require("dotenv").config();
const config = {
  base: "https://api.twelvedata.com/",
  key: process.env.API_KEY,
};

const twelvedata = require("./index.js")(config);

console.log(twelvedata.timeSeries);
