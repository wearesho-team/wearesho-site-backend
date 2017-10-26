import {Router, Request, Response} from 'express';
import * as translate from "counterpart";
import * as TeleBot from "telebot";

import {Config} from "../config";

import {CallbackModel} from "../models";
import {ModelError} from "../models/ModelError";
import {Languages} from "../models/common/Rules";

import {CallbackModelInterface} from "../interfaces/CallbackModelInterface";

const router: Router = Router();

router.post('/', async (request: Request, response: Response): Promise<void> => {
    const {body, headers} = request;
    const lang = headers["accept-language"] as string;

    Languages.hasOwnProperty(lang)
        ? translate.setLocale(lang)
        : translate.setLocale(Languages.ru);

    const model = new CallbackModel(body);
    const result: ModelError[] = await model.validate();

    if (result.length > 0) {
        response.status(400).send({ValidationError: result}).end();
        return;
    }

    await sendMessage(response, model);
});

async function sendMessage(response: Response, model: CallbackModelInterface): Promise<void> {
    const message = "Предложение к сотрудничеству\n" +
        `Имя: ${model.name}\n` +
        `Почта: ${model.mail}\n` +
        `Телефон: ${model.phone}\n` +
        `Звонить с ${model.from} до ${model.to}`;

    try {
        const bot = new TeleBot(Config.botApiKey);
        await bot.sendMessage(Config.chatId, message);
        response.status(200).send({status: "OK"}).end();
    }
    catch (error) {
        response.status(500).send({
            TelegramError: {
                message: error.description || error.message
            }
        }).end();
    }
}

export const CallbackController: Router = router;
