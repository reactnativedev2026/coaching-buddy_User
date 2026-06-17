export const nameValidation = {
    regex: /^[a-zA-Z][a-zA-Z\s]{1,48}[a-zA-Z]$/,
    message1: "Name can be 3 to 50 letters",
    message2: "Numbers/Special-Characters not allowed",
};

export const emailValidation = {
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message1: "Enter a valid email",
};

export const phoneNumberValidation = {
    regex: /^\d{10}$/,
    message1: "Enter a valid phone number",
};

export const OTPValidation = {
    regex: /^\d{4}$/,
    message1: "Enter a 4 digit OTP",
};
