import {ConfigCommon, ConfigInterface} from "./config.common";

export const ConfigTest: ConfigInterface = {
    ...ConfigCommon,
    ...{
        chatId: "357478771"
    }
};
