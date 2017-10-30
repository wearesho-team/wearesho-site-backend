import {EnvConfig} from "../env.config";

export interface ConfigInterface {
    botApiKey: string;
    chatId: string;
}

export const ConfigCommon: ConfigInterface =  {
    ...EnvConfig
};
