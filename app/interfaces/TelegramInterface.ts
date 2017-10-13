import {CallbackModelInterface} from "./CallbackModelInterface";

export interface TelegramInterface {
    send: (callback:CallbackModelInterface) => Promise<void>
}
