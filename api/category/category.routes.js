const express = require("express");
const router = express.Router();

router.post("/category", createCategory);
module.exports = router;
