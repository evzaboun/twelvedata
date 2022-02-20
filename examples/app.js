import twelvedata from "https://unpkg.com/twelvedata@latest/dist-esm/twelvedata.js?module";

// setup the key
const config = {
  key: "your-api-key",
};

// init the client
const client = twelvedata(config);

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

client.complexData(paramsPost).then((data) => {
  console.log(data);
});
