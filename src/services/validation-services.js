const passwordValidators = [
    (password) => {
        if(password.length < 8){
            throw new Error("Password length must be 8 or more characters");
        }
        return true;
    },
    (password) => {
        let isValid = false;
        [...password].forEach(letter => {
            if(letter === letter.toUpperCase()) isValid = true;
        });
        if(!isValid){
            throw new Error("Password must contain at least ONE UPPERCASE character");
        }
        return true;
    },
    (password) => {
        let isValid = false;
        [...password].forEach(letter => {
            if(letter >= "0" && letter <= "9") isValid = true;
        });
        if(!isValid){
            throw new Error("Password must contain at least ONE NUMERIC character");
        }
        return true;
    }
];
const emptyStringValidator = (string, fieldName) => {
    if (string === null || string === undefined || string === "" || string.length <= 0) throw new Error(`${fieldName} must not be empty`);
    return true;
};
export const validateUser = (user) => {
    let isValid = false;
    isValid = emptyStringValidator(user.name, "User Name");
    isValid = emptyStringValidator(user.email, "Email");
    isValid = emptyStringValidator(user.password, "Password");
    passwordValidators.forEach(validator => {
        if(validator(user.password))isValid = true;
    });
    return isValid;
}
