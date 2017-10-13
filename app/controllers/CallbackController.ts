import {Router, Request, Response} from 'express';
import {CallbackModel} from "../models";
import {ModelError} from "../models/ModelError";

const router: Router = Router();

router.post('/', async (request: Request, response: Response) => {
    const {body} = request;
    const model = new CallbackModel(body);
    const result: ModelError[] = await model.validate();

    if (result.length > 0) {
        response.status(500).send(result).end();
        return;
    }

    response.status(200).send("OK").end();
});

export const CallbackController: Router = router;