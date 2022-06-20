const createError = require("http-errors");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
// const jwt = require("jsonwebtoken");
const { checkEmail, addRegister } = require("../models/users");
// const { sendEmail } = require("../helper/mail");
const errorServ = new createError.InternalServerError();
const helper = require("../helpers/response");
// const { generateToken, generateRefreshToken } = require("../helper/token");

const register = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;
    const { rowCount } = await checkEmail(email);
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    console.log(hashPassword);
    const dataRegister = {
      id: uuidv4(),
      name,
      image: "cekImage",
      email,
      phone,
      password: hashPassword,
      role: "users",
      status: "deactivated",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    if (rowCount) {
      return next(createError(403, "email already exist"));
    } else if (dataRegister.phone.length < 11) {
      return next(createError(403, "number must be 11 digit"));
    } else if (dataRegister.password.length < 6) {
      return next(createError(403, "password must be 6-16 character"));
    } else if (req.body.confirmPassword !== password) {
      return next(createError(403, "password not match"));
    } else {
      await addRegister(dataRegister);
      delete dataRegister.password;
      // sendEmail(email);
      helper.response(res, dataRegister, 200, "Register Success");
    }
  } catch (error) {
    console.log(error);
    next(errorServ);
  }
};

module.exports = {
  register,
};
