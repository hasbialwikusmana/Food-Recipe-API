const pool = require("../configs/db");

const checkEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const addRegister = ({
  id,
  name,
  image,
  email,
  phone,
  password,
  role,
  status,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO users (id, name, image, email, phone, password, role, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [id, name, image, email, phone, password, role, status],
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

module.exports = { checkEmail, addRegister };
