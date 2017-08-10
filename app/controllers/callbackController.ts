import {Router, Request, Response} from 'express';
import {CallbackModel} from "../models/callback/CallbackModel";
import {CallbackEnum} from "../models/callback/CallbackInterface";

const router: Router = Router();

const isIdValid = (id?: string): boolean => {
    return typeof id === 'string' && id.length === 24;
};

const isStatusValid = (status?: string): boolean => {
    return typeof status === 'string' && Object
        .keys(CallbackEnum)
        .map((k: any) => CallbackEnum[k])
        .reduce((carry: boolean, value: string) => carry || (value === status), false);
};

router.get('/:id', async (req: Request, res: Response) => {
    if (!isIdValid(req.params.id)) {
        return res.status(400).end();
    }
    const model = await CallbackModel.findByHex(req.params.id).select(['id', 'status',]);
    if (!(model instanceof CallbackModel)) {
        return res.status(404).end();
    }
    res.end(JSON.stringify(model));
});

router.post('/', async (req: Request, res: Response) => {
    let phone: string = req.body.phone, name: string = req.body.name;
    try {
        if (!phone || !phone.match(/380\d{9}/)) {
            throw new Error("Invalid phone");
        }
        if (!name) {
            throw new Error("Invalid name");
        }
    }
    catch (error) {
        res.status(400).write(error.message);
        res.end();
        return;
    }
    res.setHeader('Content-Type', 'application/json');
    const model = await CallbackModel.createModel(
        name, phone,
    );
    const response = {
        id: model._id.toHexString(),
    };
    res
        .status(201)
        .end(JSON.stringify(response));
});

router.patch('/:id', async (req: Request, res: Response) => {
    if (!isIdValid(req.params.id)) {
        return res.status(400).end("Invalid ID");
    }

    if (!isStatusValid(req.body.status)) {
        return res.status(400).end("Invalid status");
    }
    const model = await CallbackModel.findByHex(req.params.id);
    if (!(model instanceof CallbackModel)) {
        return res.status(404).end();
    }
    model.status = req.body.status as CallbackEnum;
    try {
        await model.save();
    }
    catch (error) {
        return res.status(500).end(error.message);
    }
    return res.status(200).end();
});

export const CallbackController: Router = router;