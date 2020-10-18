# twelvedata

![Tests](https://github.com/evzaboun/twelvedata/workflows/Tests/badge.svg) ![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

A npm package for accessing Twelve Data's stock market APIs

https://twelvedata.com/docs

# Usage

Install

```shell
$ yarn add twelvedata
```

Use it

```js
// import the package

const twelvedata = require("twelvedata");

// setup the config

const config = {
  key: "API_KEY",
};

// initialize and use the client

const client = twelvedata(config);

// time series

let params = {
  symbol: "AAPL",
  interval: "1min",
  outputsize: 5,
};

client
  .timeSeries(params)
  .then((data) => {
    // consume array of data
  })
  .catch((error) => {
    // handle error
  });

// earnings

params = {
  symbol: "AAPL",
};

client
  .earnings(params)
  .then((data) => {
    // use earnings data
  })
  .catch((error) => {
    // handle error
  });

// api usage

client
  .apiUsage()
  .then((data) => {
    console.log(data);
    // {"timestamp":"2020-10-07 03:53:25","current_usage":0,"plan_limit":55}
  })
  .catch((error) => {
    // handle error
  });

// complex data (batched requests)

params = {
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

client
  .complexData(params)
  .then((data) => {
    // consume array of data
  })
  .catch((error) => {
    // handle error
  });

// price

params = {
  symbol: "AAPL",
};

client
  .price(params)
  .then((data) => {
    console.log(data);
    // {"price":"113.16000"}
  })
  .catch((error) => {
    // handle error
  });

// technical indicators

params = {
  symbol: "AAPL",
  interval: "1min",
  outputsize: 5,
  indicator: "stoch",
};

client
  .technicalIndicators(params)
  .then((data) => {
    // use technical indicator data
  })
  .catch((error) => {
    // handle error
  });
```

The available API methods are following an universal approach, which is inline with the available backend endpoints.

- cryptocurrencyExchanges
- earliestTimestamp
- earningsCalendar
- etf
- exchanges
- forexPairs
- indices
- symbolSearch
- quote

# Notice

This is NOT an official Twelve Data library, and the authors of this library are not affiliated with Twelve Data in any way, shape or form. Twelve Data APIs and data are Copyright © 2020 Twelve Data Pte. Ltd.
