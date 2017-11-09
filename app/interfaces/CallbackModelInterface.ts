export interface CallbackModelInterface {
    name: string;
    phone: string;
    comment?: string;
    to: string;
    from: string;
    attributes?(): string [];
}
