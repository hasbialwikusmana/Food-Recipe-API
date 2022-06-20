const router = require("express").Router();
const { register } = require("../controllers/users");

router.post("/register", register);
// .post("/login", login)
// .post("/refresh-token", refreshToken)
// .get("/profile", profile)
// .get("/activation/:token", activation)
// .delete("/:id", deleteUser)

module.exports = router;
