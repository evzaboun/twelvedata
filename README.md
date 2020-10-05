# twelvedata
![Tests](https://github.com/evzaboun/twelvedata/workflows/Tests/badge.svg)

A npm package for accessing Twelve Data's stock market APIs

https://twelvedata.com/docs


# Usage

Install the npm package

Pass the key

consume


Available APIs


``` js
// time series

const params = {
  symbol: "AAPL",
  interval: "1min",
  outputsize: 5
};

 twelvedata.timeSeries(params).then((data) => {
    // use data
 }).catch((error) => {
    // handle error
 });
```

``` js
// earnings

const params = {
  symbol: "AAPL"
};

 twelvedata.earnings(params).then((data) => {
    // use data
 }).catch((error) => {
    // handle error
 });
```

``` js
// api usage

 twelvedata.apiUsage().then((data) => {
    // use data
 }).catch((error) => {
    // handle error
 });
```

``` js
// stocks

 twelvedata.stocks().then((data) => {
    // use data
 }).catch((error) => {
    // handle error
 });
```

``` js
// complex data

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

 twelvedata.complexData(params).then((data) => {
    // use data
 }).catch((error) => {
    // handle error
 });
```


``` js
// price

const params = {
  symbol: "AAPL"
};

 twelvedata.price(params).then((data) => {
    // use data
 }).catch((error) => {
    // handle error
 });
```

``` js
// cryptocurrencies

 twelvedata.cryptocurrencies().then((data) => {
    // use data
 }).catch((error) => {
    // handle error
 });
```

``` js
// quote

const params = {
  symbol: "AAPL"
};

 twelvedata.quote(params).then((data) => {
    // use data
 }).catch((error) => {
    // handle error
 });
 ```

 The available API methods are following an universal approach, which is inline with the available backend endpoints. 

 > *  cryptocurrencyExchanges
 > *  earliestTimestamp
 > *  earningsCalendar
 > *  etf
 > *  exchanges
 > *  forexPairs
 > *  indices
 > *  symbolSearch
 > *  technicalIndicators

# Notice
This is NOT an official Twelve Data library, and the authors of this library are not affiliated with Twelve Data in any way, shape or form. Twelve Data APIs and data are Copyright © 2020 Twelve Data Pte. Ltd.

