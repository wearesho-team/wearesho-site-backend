import {Types, Model, model, Schema, DocumentQuery} from 'mongoose';
import {CallbackModelInterface} from "./CallbackModelInterface";
import {CallbackEnum} from "./CallbackInterface"

let callbackSchema: Schema = new Schema({
    id: Number,
    phone: String,
    name: String,
    time: Date,
    status: String,
});

export class CallbackModel extends model<CallbackModelInterface>('Callback', callbackSchema) implements CallbackModelInterface {
    get id() {
        return this._id.toHexString();
    }

    static createModel(name: string, phone: string, status: CallbackEnum = CallbackEnum.default): Promise<CallbackModelInterface> {
        return CallbackModel.create({
            name, phone, status,
            time: new Date(),
        });
    }

    static findByHex(hex: string): DocumentQuery<CallbackModelInterface | null, CallbackModelInterface> {
        const id = Types.ObjectId.createFromHexString(hex);
        return CallbackModel.findById(id);
    }
}