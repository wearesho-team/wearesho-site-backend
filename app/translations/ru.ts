import * as translate from "counterpart";
import {NameRange} from "../models/common/Rules";

translate.registerTranslations("ru", {
    incorrect: {
        phone: "Некорректный телефон",
        mail: "Некорректный E-Mail",
        name: `Латиница/кириллица от ${NameRange.min} до ${NameRange.max} символов`,
        time: "Некорректное время"
    },
    empty: "Обязательно для заполнения"
});
