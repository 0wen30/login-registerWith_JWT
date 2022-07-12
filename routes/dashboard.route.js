const { home } = require("../controllers/dashboard.controller");
const verifyToken = require("../middlewares/validarToken");

const router = require("express").Router();

router.get("/",verifyToken,home);

module.exports = router;

