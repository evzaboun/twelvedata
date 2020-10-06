'use strict';

import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://api.twelvedata.com',
});

axiosClient.defaults.headers.post['Content-Type'] = 'application/json';

export default axiosClient;
