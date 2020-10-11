import TwelveData from '..';

describe("index", () => {
  test(`initialization without a config throws an error`, () => {
    expect(() => TwelveData()).toThrow(`Missing config`);
  });

  test(`initialization without a config key throws an error`, () => {
    expect(() => TwelveData({})).toThrow(`Missing config settings: key`);
  });

  test(`initialization with a config is succesfull`, () => {
    const twelveData = TwelveData({
      key: 'a-key'
    });

    expect(twelveData).toBeDefined();
    expect(twelveData.apiUsage).toBeDefined();
    expect(twelveData.complexData).toBeDefined();
    expect(twelveData.cryptocurrencies).toBeDefined();
    expect(twelveData.cryptocurrencyExchanges).toBeDefined();
    expect(twelveData.earliestTimestamp).toBeDefined();
    expect(twelveData.earnings).toBeDefined();
    expect(twelveData.earningsCalendar).toBeDefined();
    expect(twelveData.etf).toBeDefined();
    expect(twelveData.exchanges).toBeDefined();
    expect(twelveData.forexPairs).toBeDefined();
    expect(twelveData.indices).toBeDefined();
    expect(twelveData.price).toBeDefined();
    expect(twelveData.quote).toBeDefined();
    expect(twelveData.stocks).toBeDefined();
    expect(twelveData.symbolSearch).toBeDefined();
    expect(twelveData.technicalIndicators).toBeDefined();
    expect(twelveData.timeSeries).toBeDefined();
  });
});