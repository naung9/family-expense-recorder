export class FieldError extends Error{
    constructor(field, msg) {
        super(msg);
        this.field = field;
    }
    getField(){
        return this.field;
    }
}

export class PasswordError extends Error{

}

const passwordValidators = [
    (password) => {
        if(password.length < 8){
            throw new PasswordError("Password length must be 8 or more characters");
        }
        return true;
    },
    (password) => {
        let isValid = false;
        [...password].forEach(letter => {
            if(letter === letter.toUpperCase()) isValid = true;
        });
        if(!isValid){
            throw new PasswordError("Password must contain at least ONE UPPERCASE character");
        }
        return true;
    },
    (password) => {
        let isValid = false;
        [...password].forEach(letter => {
            if(letter >= "0" && letter <= "9") isValid = true;
        });
        if(!isValid){
            throw new PasswordError("Password must contain at least ONE NUMERIC character");
        }
        return true;
    }
];
const emptyStringValidator = (string, fieldName, fieldLabel) => {
    if (string === null || string === undefined || string === "" || string.length <= 0) throw new FieldError(fieldName,`${fieldName} must not be empty`);
    return true;
};
export const validateUser = (user) => {
    let isValid = false;
    isValid = emptyStringValidator(user.name, "name","User Name");
    isValid = emptyStringValidator(user.email, "email","Email");
    isValid = emptyStringValidator(user.password, "password","Password");
    if(user.password !== user.confirmPassword) throw new PasswordError("Password and confirm password does not match");
    passwordValidators.forEach(validator => {
        if(validator(user.password))isValid = true;
    });
    return isValid;
}
