// =======================================
// USER VALIDATION
// =======================================

exports.validateRegister = (data) => {

    if (!data.first_name)
        throw new Error("First name is required");

    if (!data.last_name)
        throw new Error("Last name is required");

    if (!data.email)
        throw new Error("Email is required");

    if (!data.password)
        throw new Error("Password is required");
};

exports.validateLogin = (data) => {

    if (!data.email)
        throw new Error("Email is required");

    if (!data.password)
        throw new Error("Password is required");
};