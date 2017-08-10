export interface ConfigInterface {
    url: string
}

let config = require('../config.json');
if (!config) {
    config = {
        url: "mongodb://127.0.0.1:27017"
    } as ConfigInterface;
} else {
    config = config as ConfigInterface;
}

export const Config = <ConfigInterface>config;