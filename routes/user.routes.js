const { registrar, login } = require("../controllers/user.controller");

const router = require("express").Router();

router.post("/register",registrar);

router.post("/login",login);

module.exports = router;

