declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BOT_API_KEY: string | undefined;
            CHAT_ID: string | undefined;
        }
    }
}

export interface Config {
    botApiKey: string | undefined;
    chatId: string | undefined;
}

export const Config: Config = {
    get botApiKey() {
        return process.env.BOT_API_KEY;
    },
    get chatId() {
        return process.env.CHAT_ID;
    }
};
