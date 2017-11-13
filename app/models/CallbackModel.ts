import {
    IsDefined,
    IsEmail,
    IsNotEmpty,
    Matches,
    validate,
    ValidationError,
    ValidationOptions
} from "class-validator";
import * as translate from "counterpart";

import {namePattern, phonePattern, timePattern} from "./common/Rules";

import {CallbackModelInterface} from "../interfaces/CallbackModelInterface";
import {ModelError} from "./ModelError";

export class CallbackModel implements CallbackModelInterface {
    constructor(props: CallbackModelInterface) {
        Object.assign(this, props);
    }

    @IsDefined({
        message: "empty"
    })
    @IsNotEmpty({
        message: "empty",
    })
    public phone: string;

    public comment: string;

    @Matches(namePattern, {
        message: "incorrect.name",
    })
    @IsDefined({
        message: "empty",
    })
    @IsNotEmpty({
        message: "empty",
    })
    public name: string;

    @Matches(timePattern, {
        message: "incorrect.time",
    })
    @IsDefined({
        message: "empty",
    })
    @IsNotEmpty({
        message: "empty",
    })
    public from: string;

    @Matches(timePattern, {
        message: "incorrect.time",
    })
    @IsDefined({
        message: "empty",
    })
    @IsNotEmpty({
        message: "empty",
    })
    public to: string;

    public timeZone: string;

    public attributes(): string [] {
        return ["name", "phone", "comment", "to", "from"];
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
                        .map((key: string) => translate(error.constraints[key]))
                        .join(", "),
                };
            });
    }
}
