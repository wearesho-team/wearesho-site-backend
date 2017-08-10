import 'babel-polyfill';

import * as express from 'express';

import {CallbackController} from './controllers';

const config = require('./config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.Config.url, {
    useMongoClient: true,
});

const app: express.Application = express();
const port: number = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(require('body-parser').json({type: '*/*'}));
app.use('/callback', CallbackController);

app.listen(port, () => {});

export default app;