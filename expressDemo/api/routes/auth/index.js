const express = require("express");
const { Auth } = require("@/controllers");

const router = express.Router();

router.post("/register", Auth.RegisterController.register);
router.post("/login", Auth.LoginController.login);

module.exports = router;
