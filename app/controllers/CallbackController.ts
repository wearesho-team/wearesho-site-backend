import { Router, Request, Response } from 'express';
import * as translate from "counterpart";
import * as TeleBot from "telebot";
import { Config } from "../config";

import { CallbackModel } from "../models";
import { ModelError } from "../models";
import { Languages } from "../models/common";

const router: Router = Router();

router.post('/', async (request: Request, response: Response): Promise<void> => {
    const { body, headers } = request;
    const lang = headers[ "accept-language" ] as string;

    Languages.hasOwnProperty(lang)
        ? translate.setLocale(lang)
        : translate.setLocale(Languages.ru);

    const model = new CallbackModel(body);
    const result: ModelError[] = await model.validate();

    if (result.length > 0) {
        response.status(400).send(result).end();
        return;
    }

    const message = "Предложение к сотрудничеству\n" +
        `Имя: ${model.name}\n` +
        `Телефон: ${model.phone}\n` +
        `Звонить с ${model.from} до ${model.to}\n` +
        (model.comment ? `Коментарий: ${model.comment}\n` : "") +
        `Язык: ${translate.getLocale()}\n` +
        `Часовой пояс: ${model.timeZone}`;

    if (("string" !== typeof Config.botApiKey)
        || ("string" !== typeof Config.chatId)
    ) {
        console.log(message);
        response.status(503).end();
        return;
    }

    try {
        const bot = new TeleBot(Config.botApiKey);
        await bot.sendMessage(Config.chatId, message);
        response.status(200).end();
    } catch (error) {
        console.error(error.description || error.message);
        response.status(500).end();
    }
});

export const CallbackController: Router = router;
