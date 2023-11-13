const express = require("express");
const {
  getRecipes,
  getOneRecipe,
  getUserRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require("./recipe.controllers");
const passport = require("passport");
const router = express.Router();

router.get("/", getRecipes);
router.get("/:recipeId", getOneRecipe);
router.get("/:userId", getUserRecipes);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createRecipe
);
router.put(
  "/:recipeId",
  passport.authenticate("jwt", { session: false }),
  updateRecipe
);
router.delete(
  "/:recipeId",
  passport.authenticate("jwt", { session: false }),
  deleteRecipe
);
module.exports = router;
