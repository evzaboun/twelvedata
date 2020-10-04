require("dotenv").config();
const config = {
  base: "https://api.twelvedata.com",
  key: process.env.API_KEY,
};

const twelvedata = require("./index.js")(config);
// const params = {
//   symbol: "AAPL",
//   interval: "1min",
//   outputsize: 5,
// };
const params = {
  symbols: ["AAPL", "MSFT", "GOOG"],
  intervals: ["5min", "1day"],
  outputsize: 5,
  methods: [
    "time_series",
    {
      name: "ema",
      time_period: 12,
    },
  ],
};
// time series
// twelvedata.timeSeries(params).then((data) => {
//   console.log(data);
// });

twelvedata.complexData(params).then((data) => {
  console.log(data);
});
// twelvedata.earnings({
//   symbol:'AAPL'
// }).then(data => {
//   console.log(JSON.stringify(data));
// });

// twelvedata.apiUsage().then((data) => {
//   console.log(data);
// });

// twelvedata.stocks(params).then(data => {
//   console.log(JSON.stringify(data));
// });

// twelvedata.price({
//   symbol:'AAPL'
// }).then(data => {
//   console.log(JSON.stringify(data));
// });

// twelvedata.earningsCalendar({
//   symbol:'AAPL'
// }).then(data => {
//   console.log(JSON.stringify(data));
// });
