import {apiKeys} from "../apiKeys";

export interface ConfigInterface {
    botApiKey: string;
    chatId: string;
}

export const ConfigCommon: ConfigInterface =  {
    ...apiKeys
};
