import * as translate from "counterpart";
import {NameRange} from "../models/common/Rules";

translate.registerTranslations("en", {
    incorrect: {
        phone: "Incorrect phone",
        mail: "Incorrect E-Mail",
        name: `Latin/Cyrillic letters from ${NameRange.min} to ${NameRange.max} characters`,
        time: "Incorrect time"
    },
    empty: "Required"
});
