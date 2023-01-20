const { registerUserValidationSchema, loginUserValidationSchema, editUserProfileValidationSchema, forgotUserPasswordValidationSchema, changePasswordValidationSchema } = require('../validation/userValidation');

const registerUserValidation = (req, res, next) => {
    const validationResult = registerUserValidationSchema.validate(req.body);
    
    if (validationResult.error) {
        return res.status(400).json({ message: validationResult.error.message });
    }

    next();
}

const loginUserValidation = (req, res, next) => {
    const validationResult = loginUserValidationSchema.validate(req.body);
    
    if (validationResult.error) {
        return res.status(400).json({ message: validationResult.error.message });
    }

    next();
}

const editUserProfileValidation = (req, res, next) => {
    const validationResult = editUserProfileValidationSchema.validate(req.body);

    if (validationResult.error) {
        return res.status(400).json({ message: validationResult.error.message });
    }

    next();
}

const forgotUserPasswordValidation = (req, res, next) => {
    const validationResult = forgotUserPasswordValidationSchema.validate(req.body);

    if (validationResult.error) {
        return res.status(400).json({ message: validationResult.error.message });
    }

    next();
}

const changePasswordValidation = (req, res, next) => {
    const validationResult = changePasswordValidationSchema.validate(req.body);

    if (validationResult.error) {
        return res.status(400).json({ message: validationResult.error.message });
    }

    next();
}

module.exports = {
    registerUserValidation,
    loginUserValidation,
    editUserProfileValidation,
    forgotUserPasswordValidation,
    changePasswordValidation
}