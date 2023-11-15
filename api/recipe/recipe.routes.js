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
const upload = require("../../middleware/upload");
router.get("/", getRecipes);
router.get("/:recipeId", getOneRecipe);
router.get("/:userId", getUserRecipes);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createRecipe
);
router.put(
  "/:recipeId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateRecipe
);
router.delete(
  "/:recipeId",
  passport.authenticate("jwt", { session: false }),
  deleteRecipe
);
module.exports = router;
