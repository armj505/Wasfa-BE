const express = require("express");
const router = express.Router();
const {
  getAllIngredient,
  getIngredientById,
  createIngredient,
  updtIngredient,
  delIngredient,
} = require("../ingredient/ingredient.controllers");

router.get("/", getAllIngredient);
router.get("/:ingredientId", getIngredientById);
router.post("/", createIngredient);
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
