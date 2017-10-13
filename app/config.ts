export interface ConfigInterface {
    "botApiKey": string;
    "chatId": string;
}

export const Config = require('../config.json') as ConfigInterface;
