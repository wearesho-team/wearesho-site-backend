import * as translate from "counterpart";
import axios, { AxiosResponse } from "axios";
import { expect } from "chai";

import { Languages } from "../app/models/common/Rules";
import "../app/server";
import { server, port } from "../app/server";

axios.defaults.baseURL = `http://localhost:${port}`;
axios.defaults.timeout = 5000;
axios.defaults.headers["accept-language"] = Languages.ru;

describe("Index", () => {
    it("Should return name and version on GET /", async () => {
        const response: AxiosResponse<{ name?: string, version?: string }> = await axios.get("/");
        expect(response.status).to.be.equal(200);
        expect(response.data).to.have.property('name');
        expect(response.data).to.have.property('version');
        expect(response.data.version).to.be.string;
        expect(response.data.name).to.be.equal('wearesho-site-backend');
    });
})

describe("Callback controller", () => {
    const ValidData = {
        name: "Name",
        phone: "12345678910",
        from: "12:00",
        to: "15:00"
    };

    const InvalidData = {
        name: "N",
        phone: "1234",
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
