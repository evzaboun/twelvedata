import Utilities from "../lib/utilities";
import crossFetch from "cross-fetch";

jest.mock("cross-fetch", () => {
  return jest.fn();
});
describe("utilities", () => {
  let utils;
  beforeEach(() => {
    utils = new Utilities("apiKey");
  });

  describe("getAvailableEndpoints", () => {
    it("i get successfully the available endpoints", () => {
      const availableEndpoints = utils.getAvailableEndpoints();

      expect(availableEndpoints).toMatchObject({
        apiUsage: "/api_usage",
        complexData: "/complex_data",
        cryptocurrencies: "/cryptocurrencies",
        cryptocurrencyExchanges: "/cryptocurrency_exchanges",
        earliestTimestamp: "/earliest_timestamp",
        earnings: "/earnings",
        earningsCalendar: "/earnings_calendar",
        etf: "/etf",
        exchanges: "/exchanges",
        forexPairs: "/forex_pairs",
        indices: "/indices",
        price: "/price",
        quote: "/quote",
        stocks: "/stocks",
        symbolSearch: "/symbol_search",
        technicalIndicators: "/{indicator}",
        timeSeries: "/time_series",
      });
    });
  });

  describe("createFunc", () => {
    let params;

    beforeEach(() => {
      crossFetch.mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          json: () => Promise.resolve(["AAPL", "MSFT"]),
        });
      });
      params = {
        symbol: "AAPL",
        interval: "1min",
        outputsize: 5,
        indicator: "stoch",
      };
    });

    it("create func returns another function", () => {
      const createFunction = utils.createFunc("/technical_indicators", "get");

      expect(typeof createFunction).toBe("function");
    });

    it("fetch is called with proper parameters", () => {
      const createFunction = utils.createFunc("technicalIndicators", "get");

      createFunction(params);

      expect(crossFetch).toHaveBeenCalledWith(
        "https://api.twelvedata.com/stoch?symbol=AAPL&interval=1min&outputsize=5&indicator=stoch&apikey=apiKey",
        {
          cache: "no-cache",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "get",
        }
      );
    });

    it("fetch returns the proper data when response is 200", async () => {
      const createFunction = utils.createFunc("technicalIndicators", "get");

      const requestPromise = createFunction(params);

      await expect(requestPromise).resolves.toEqual(["AAPL", "MSFT"]);
    });

    it("fetch throws an error when status response is different from 200", async () => {
      crossFetch.mockImplementationOnce(() => {
        return Promise.resolve({
          status: 404,
          json: () => Promise.reject(["AAPL", "MSFT"]),
        });
      });
      const createFunction = utils.createFunc("technicalIndicators", "get");

      const requestPromise = createFunction(params);

      await expect(requestPromise).rejects.toMatch(
        `A twelve data API error occurred. 404`
      );
    });

    it("fetch throws an error when request throws an error", async () => {
      crossFetch.mockImplementationOnce(() => {
        return Promise.reject("Request failed");
      });

      const createFunction = utils.createFunc("technicalIndicators", "get");

      const requestPromise = createFunction(params);

      await expect(requestPromise).rejects.toMatch(`Request failed`);
    });
  });
});
