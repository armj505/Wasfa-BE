const express = require("express");
const passport = require("passport");
const {
  getAllIngredient,
  getIngredientById,
  createIngredient,
  updtIngredient,
  delIngredient,
} = require("../ingredient/ingredient.controllers");
const router = express.Router();

router.get("/", getAllIngredient);
router.get("/:ingredientId", getIngredientById);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createIngredient
);
router.put(
  "/:ingredientId",
  passport.authenticate("jwt", { session: false }),
  updtIngredient
);
router.delete(
  "/:ingredientId",
  passport.authenticate("jwt", { session: false }),
  delIngredient
);

module.exports = router;
