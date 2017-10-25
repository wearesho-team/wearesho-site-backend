import * as translate from "counterpart";
import axios from "axios";
import {expect} from "chai";

import {Languages} from "../app/models/common/Rules";
import "../app/server";
import {server, port} from "../app/server";

axios.defaults.baseURL = `http://localhost:${port}`;
axios.defaults.timeout = 5000;
axios.defaults.headers["accept-language"] = Languages.ru;

describe("Callback controller", () => {
    const ValidData = {
        name: "Name",
        phone: "12345678910",
        mail: "mail@mail.com",
        from: "12:00",
        to: "15:00"
    };

    const InvalidData = {
        name: "N",
        phone: "1234",
        mail: "mailmail.com",
        from: "12:69",
        to: "25:00"
    };

    after(() => {
        server.close();
    });

    it("Should return status 200 on success validation", async () => {
        expect((await axios.post("/callback", ValidData)).status).to.equal(200);
    });

    it("Should return status 400 on fail validation", async () => {
        try {
            await axios.post("/callback", InvalidData)
        }
        catch (error) {
            expect(error.response.status).to.equal(400);
        }
    });

    it("Should set language from headers", async () => {
        expect((await axios.post("/callback", ValidData)).status).to.equal(200);
        expect(translate.getLocale()).to.equal(Languages.ru);
    });

});