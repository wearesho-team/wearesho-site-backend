import '../app/server';

import axios, {AxiosResponse} from 'axios';
import {CallbackModel} from "../app/models/callback/CallbackModel"
import {expect} from 'chai';
import {Types} from 'mongoose';
import {CallbackEnum} from "../app/models/callback/CallbackInterface"
import {CallbackModelInterface} from "../app/models/callback/CallbackModelInterface";

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.timeout = 5000;

describe('Callback Controller', () => {

    describe('GET /callback', () => {

        it('Should return 404', async function () {
            let response;
            try {
                response = await axios.get('/callback');
            }
            catch (error) {
                expect(error).to.have.property('response');
                expect(error.response.status).to.be.equal(404);
            }
            expect(response).to.not.exist;
        })
    });

    describe('POST /callback', () => {
        it('Should return 400 on invalid name with error message', async function () {
            let response;
            try {
                response = await axios.post('/callback', {
                    phone: '380502283220',
                });
            }
            catch (error) {
                expect(error).to.have.property('response');
                expect(error.response.status).to.be.equal(400);
                expect(error.response.data).to.contain('Invalid name');
            }
            expect(response).to.be.not.exist;
        });

        it('Should return 400 on invalid phone with error message', async function () {
            let response;
            try {
                response = await axios.post('/callback', {
                    name: 'Александр',
                });
            }
            catch (error) {
                expect(error).to.have.property('response');
                expect(error.response.status).to.be.equal(400);
                expect(error.response.data).to.contain('Invalid phone');
            }
            expect(response).to.not.exist;
        });

        it("Should return 200 json with ID ", async function () {
            let response: AxiosResponse;
            try {
                response = await axios.post('/callback', {
                    name: "Александр",
                    phone: "380502283220",
                });
            }
            catch (error) {
                expect(error).to.not.exist;
                return;
            }
            expect(response.status).to.be.equal(201);
            expect(response.data).to.be.instanceof(Object);
            expect(response.data).to.have.property('id');

            const model = await CallbackModel.findByHex(response.data.id);
            expect(model).to.be.instanceof(CallbackModel);
            if (model instanceof CallbackModel) {
                expect(model.id).to.be.equal(response.data.id);
            }
        });
    });

    describe('GET /callback/:id', () => {
        it('Should return 404 on wrong ID', async () => {
            try {
                const response = await axios.get('/callback/' + Types.ObjectId().toHexString());
                expect(response).to.not.exist;
            }
            catch (error) {
                expect(error).to.have.property('response');
                expect(error.response.status).to.be.equal(404);
            }
        });

        it('Should return 400 on invalid ID', async () => {
            try {
                const response = await axios.get('/callback/id');
                expect(response).to.not.exist;
            }
            catch (error) {
                expect(error).to.have.property('response');
                expect(error.response.status).to.be.equal(400);
            }
        });

        it('Should return 200 with JSON object', async () => {
            const model = await CallbackModel.createModel(
                'Alexander',
                '380502105844',
                CallbackEnum.finish
            );
            let response;
            try {
                response = await axios.get(`/callback/${model.id}`);
            }
            catch (error) {
                expect(error).to.not.exist;
                return;
            }
            expect(response.data._id).to.be.equal(model.id);
            expect(response.data.status).to.equal(model.status);
        });
    });

    describe('PATCH /callback/:id', () => {
        it('Should return 400 on invalid ID', async () => {
            try {
                const response = await axios.patch('/callback/invalidId');
                expect(response).to.not.exist;
            }
            catch (error) {
                expect(error).to.have.property('response');
                expect(error.response.status).to.be.equal(400);
                expect(error.response.data).to.be.equal('Invalid ID')
            }
        });

        it('Should return 400 on no status', async () => {
            const validId = Types.ObjectId().toHexString();
            try {
                const response = await axios.patch(`/callback/${validId}`);
                expect(response).to.not.exist;
            }
            catch (error) {
                expect(error).to.have.property('response');
                expect(error.response.status).to.be.equal(400);
                expect(error.response.data).to.be.equal('Invalid status');
            }
        });
        it('Should return 400 on invalid status', async () => {
            const validId = Types.ObjectId().toHexString();
            try {
                const response = await axios.patch(`/callback/${validId}`, {
                    status: 'is-not-valid',
                });
                expect(response).to.not.exist;
            }
            catch (error) {
                expect(error).to.have.property('response');
                expect(error.response.status).to.be.equal(400);
                expect(error.response.data).to.be.equal('Invalid status');
            }
        });

        it("Should return 200 on valid input", async () => {
            let model: CallbackModelInterface | null = await CallbackModel.createModel('Alex Rose', '380502105844');
            let response;
            try {
                response = await axios.patch(`/callback/${model.id}`, {
                    status: CallbackEnum.finish
                });
            }
            catch (error) {
                expect(error).to.not.exist;
                return;
            }
            expect(response.status).to.be.equal(200);
            expect(response.data).to.be.empty;
            model = await CallbackModel.findByHex(model.id || '');
            if (model instanceof CallbackModel) {
                expect(model.status).to.be.equal(CallbackEnum.finish);
            }
        });
    });
});