export default Utilities;
declare class Utilities {
    constructor(key: any);
    apiKey: {
        apikey: any;
    };
    getAvailableEndpoints(): {
        apiUsage: string;
        complexData: string;
        cryptocurrencies: string;
        cryptocurrencyExchanges: string;
        earliestTimestamp: string;
        earnings: string;
        earningsCalendar: string;
        etf: string;
        exchanges: string;
        forexPairs: string;
        indices: string;
        price: string;
        quote: string;
        stocks: string;
        symbolSearch: string;
        technicalIndicators: string;
        timeSeries: string;
    };
    createFunc(endpointName: any, requestType: any): (params: any) => Promise<any>;
}
//# sourceMappingURL=utilities.d.ts.map