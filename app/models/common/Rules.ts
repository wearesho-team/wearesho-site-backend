export const PhoneRange = {
    max: 16,
    min: 9
};

export const NameRange = {
    max: 24,
    min: 2
};

export const phonePattern = new RegExp(`^\\d{${PhoneRange.min},${PhoneRange.max}}$`);
export const namePattern = new RegExp(`^[\sa-zA-ZА-Яа-яЄЇІєїіыЫёЁъЪ'\\-]{${NameRange.min},${NameRange.max}}$`);

export const TimeDefaults = {
    from: "09:00",
    to: "18:00"
};
