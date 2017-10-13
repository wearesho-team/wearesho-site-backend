export interface CallbackModelInterface {
    name: string;
    phone: string;
    mail: string;
    to: string;
    from: string;
    attributes?(): string [];
}