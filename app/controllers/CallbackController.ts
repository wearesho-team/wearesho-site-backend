import {Router, Request, Response} from 'express';
import * as translate from "counterpart";
import {Config} from "../config";

import * as TeleBot from "telebot";

import {CallbackModel} from "../models";
import {ModelError} from "../models/ModelError";

const router: Router = Router();

router.post('/', async (request: Request, response: Response) => {
    const {body, headers} = request;
    const lang = headers["accept-language"] as string;
    translate.setLocale(lang);

    const model = new CallbackModel(body);
    const result: ModelError[] = await model.validate();

    if (result.length > 0) {
        response.status(400).send(result).end();
        return;
    }

    const message = "Предложение к сотрудничеству\n" +
        `Имя: ${model.name}\n` +
        `Почта: ${model.mail}\n` +
        `Телефон: ${model.phone}\n` +
        `Звонить с ${model.from} до ${model.to}`;

    const bot = new TeleBot(Config.botApiKey);
    try {
        await bot.sendMessage(Config.chatId, message);
        response.status(200).send("OK").end();
    }
    catch ({error_code, description, code}) {
        response.status(error_code).send(description).end();
    }
});

export const CallbackController: Router = router;
