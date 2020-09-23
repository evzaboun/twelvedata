const axios = require("axios");

const instance = axios.create({
    baseURL: 'https://api.twelvedata.com/'
});

export default instance;