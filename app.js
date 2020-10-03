require("dotenv").config();
const config = {
  base: "https://api.twelvedata.com",
  key: process.env.API_KEY,
};

const twelvedata = require("./index.js")(config);
const params = {
  symbol:'AAPL',
  interval:'1min'
};

// time series
twelvedata.timeSeries(params).then(data => {
  console.log(JSON.stringify(data));
});

twelvedata.earnings({
  symbol:'AAPL'
}).then(data => {
  console.log(JSON.stringify(data));
});

twelvedata.apiUsage().then(data => {
  console.log(JSON.stringify(data));
});

twelvedata.stocks(params).then(data => {
  console.log(JSON.stringify(data));
});

twelvedata.price({
  symbol:'AAPL'
}).then(data => {
  console.log(JSON.stringify(data));
});

twelvedata.earningsCalendar({
  symbol:'AAPL'
}).then(data => {
  console.log(JSON.stringify(data));
});