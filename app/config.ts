import {ConfigTest} from "../config/config.test";
import {ConfigProd} from "../config/config.prod";

export const Config = process.env.NODE_ENV === "test" ? ConfigTest : ConfigProd;
