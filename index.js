'use strict';

import Earnings from './lib/earnings';
import TimeSeries from './lib/timeSeries';

export default (config = {}) => {
  // Check for API Key
  if (config.key === undefined) {
    throw new Error('Missing config settings: key');
  }

  const availableEndpoints = {
    earnings: 'earnings',
    time_series: 'time_series',
    complex_data: 'complex_data',
    stocks: 'stocks',
  };

  // Base url for the client
  config.base = `https://api.twelvedata.com/`;

  return {
    earnings: Earnings(config),
    timeSeries: TimeSeries(config),
  };
};
