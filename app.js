import dotenv from 'dotenv';
import twelvedata from './index.js';

// setup the key
const config = {
  key: dotenv.config().parsed.API_KEY
};

// init the client
const client = twelvedata(config);

// const paramsGet = {
//   symbol: "AAPL",
//   interval: "1min",
//   outputsize: 5,
// };
const paramsPost = {
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

const paramsGet = {
  symbol: "AAPL",
  interval: "1min",
  outputsize: 5,
  indicator: "stoch",
};

// use it
// client.timeSeries(paramsGet).then((data) => {
//   console.log(data);
// });

// client.complexData(paramsPost).then((data) => {
//   console.log(data);
// });

// client.earnings({
//   symbol:'AAPL'
// }).then(data => {
//   console.log(JSON.stringify(data));
// });

// client.apiUsage().then((data) => {
//   console.log(data);
// });

// client.stocks(paramsGet).then(data => {
//   console.log(JSON.stringify(data));
// });

client.technicalIndicators(paramsGet).then((data) => {
  console.log(JSON.stringify(data));
});

// client.price({
//   symbol:'AAPL'
// }).then(data => {
//   console.log(JSON.stringify(data));
// });

// client.earningsCalendar({
//   symbol:'AAPL'
// }).then(data => {
//   console.log(JSON.stringify(data));
// });

// client.quote({
//   symbol:'AAPL'
// }).then(data => {
//   console.log(JSON.stringify(data));
// });
