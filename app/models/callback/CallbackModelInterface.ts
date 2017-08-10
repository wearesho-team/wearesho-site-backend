import {CallbackInterface} from "./CallbackInterface";
import {Document} from "mongoose"

export interface CallbackModelInterface extends CallbackInterface, Document {
}