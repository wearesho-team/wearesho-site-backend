import {IsDefined, IsEmail, IsNotEmpty, Matches, validate, ValidationError, ValidationOptions} from "class-validator";

import {CallbackModelInterface} from "../interfaces/CallbackModelInterface";
import {ModelError} from "./ModelError";
import {namePattern, NameRange, phonePattern, TimeDefaults} from "./common/Rules";

export class CallbackModel implements CallbackModelInterface {
    constructor(props: CallbackModelInterface) {
        Object.assign(this, props);
    }

    @Matches(phonePattern, {
        message: "Некорректный телефон",
    })
    @IsDefined({
        message: "Обязательно для заполнения",
    })
    @IsNotEmpty({
        message: "Обязательно для заполнения",
    })
    public phone: string;

    @IsEmail({}, {
        message: "Некорректный E-Mail",
    })
    @IsDefined({
        message: "Обязательно для заполнения",
    })
    @IsNotEmpty({
        message: "Обязательно для заполнения",
    })
    public mail: string;

    @Matches(namePattern, {
        message: `Только латиница или кириллица длинной от ${NameRange.min} до ${NameRange.max} символов`,
    })
    @IsDefined({
        message: "Обязательно для заполнения",
    })
    @IsNotEmpty({
        message: "Обязательно для заполнения",
    })
    public name: string;

    @IsDefined({
        message: "Обязательно для заполнения",
    })
    @IsNotEmpty({
        message: "Обязательно для заполнения",
    })
    public from: string = TimeDefaults.from;

    @IsDefined({
        message: "Обязательно для заполнения",
    })
    @IsNotEmpty({
        message: "Обязательно для заполнения",
    })
    public to: string = TimeDefaults.to;

    public attributes(): string [] {
        return ["name", "phone", "mail", "to", "from"];
    }

    public async validate(options: ValidationOptions = {}): Promise<ModelError[]> {
        return (await validate(
            this as any,
            {
                skipMissingProperties: true,
                ...options,
            }
        ))
            .map((error: ValidationError): ModelError => {
                return {
                    attribute: error.property,
                    details: Object.keys(error.constraints)
                        .map((key: string) => error.constraints[key])
                        .join(", "),
                };
            });
    }
}
