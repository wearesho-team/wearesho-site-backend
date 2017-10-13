import 'babel-polyfill';

import * as express from 'express';

import {CallbackController} from './controllers';

const app: express.Application = express();
const port: number = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(require('cors')());

app.use(require('body-parser').json({type: '*/*'}));
app.use('/callback', CallbackController);

app.listen(port);

export default app;