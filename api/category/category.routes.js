const express = require("express");
const passport = require("passport");
const {
  getAllCategory,
  getCategoryById,
  updtCategory,
  delCategory,
  createCategory,
} = require("../category/category.controllers");
const router = express.Router();

router.get("/", getAllCategory);
router.get("/:categoryId", getCategoryById);
router.put(
  "/:categoryId",
  passport.authenticate("jwt", { session: false }),
  updtCategory
);
router.delete(
  "/:categoryId",
  passport.authenticate("jwt", { session: false }),
  delCategory
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createCategory
);
module.exports = router;
