import Utilities from "../lib/utilities";
import axios from "axios";

jest.mock("axios");

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
      axios.request.mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          data: ["AAPL", "MSFT"]
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

    it("axios.request is called with proper parameters", () => {
      const createFunction = utils.createFunc("technicalIndicators", "get");

      createFunction(params);

      expect(axios.request).toHaveBeenCalledWith({
        method: "get",
        url: "/stoch?apikey=apiKey",
        data: params,
        params: params,
      });
    });

    it("axios.request returns the proper data when response is 200", (done) => {
      const createFunction = utils.createFunc("technicalIndicators", "get");

      const requestPromise = createFunction(params);
      requestPromise.then((res) => {
        expect(res).toEqual(["AAPL", "MSFT"]);
        done();
      });
    });

    it("axios.request throws an error when status response is different from 200", (done) => {
      axios.request.mockImplementationOnce(() => {
        return Promise.resolve({
          status: 404,
          data: undefined
        });
      });

      const createFunction = utils.createFunc("technicalIndicators", "get");

      const requestPromise = createFunction(params);
      requestPromise.catch((err) => {
        expect(err).toMatch(`A twelve data API error occurred. 404`);
        done();
      });
    });

    it("axios.request throws an error when request throws an error", (done) => {
      axios.request.mockImplementationOnce(() => {
        return Promise.reject("Request failed");
      });

      const createFunction = utils.createFunc("technicalIndicators", "get");

      const requestPromise = createFunction(params);
      requestPromise.catch((err) => {
        expect(err).toMatch(`Request failed`);
        done();
      });
    });
  });
});