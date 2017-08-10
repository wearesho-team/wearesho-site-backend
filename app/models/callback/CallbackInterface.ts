export enum CallbackEnum {
    form = 'is-default',
    calling = 'is-calling',
    finish = 'is-calling-success',
    noLines = 'is-no-lines',
    noConnection = 'is-calling-fail',
    noPossibility = 'is-no-possibility',
    limitExpired = 'is-limit-expired',
}

export interface CallbackInterface {
    time: Date,
    phone: string,
    name: string,
    status: CallbackEnum,
}
