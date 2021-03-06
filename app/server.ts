import "./translations/en";
import "./translations/ru";

import * as express from 'express';

import { CallbackController } from './controllers';

const app: express.Application = express();
export const port: number = process.env.PORT ? Number(process.env.PORT) : 3000;

const meta = require("../meta.json");

app.use(require('cors')());
app.use(require('body-parser').json({ type: '*/*' }));

app.get("/", (request, response: express.Response) => {
    response.json(meta).send();
});

app.use('/callback', CallbackController);

export const server = app.listen(port);
console.log(`Running on http://localhost:${port}`);

export default app;
