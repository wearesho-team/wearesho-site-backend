export const PhoneRange = {
    max: 16,
    min: 9
};

export const NameRange = {
    max: 24,
    min: 2
};

export const phonePattern = new RegExp(`^[\\+\\-\\(\\)*\\d\\s]{${PhoneRange.min},${PhoneRange.max}}$`);
export const namePattern = new RegExp(`^[\\sa-zA-ZА-Яа-яЄЇІєїіыЫёЁъЪ'\\-]{${NameRange.min},${NameRange.max}}$`);
export const timePattern = /^([0-2][0-4]|[0-1][0-9])\:[0-5][0-9]$/;

export enum Languages {
    en = "en",
    ru = "ru"
}
