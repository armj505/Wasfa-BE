const express = require("express");
const router = express.Router();

router.get("/", getRecipies);
router.get("/:recipeId", getOneRecipe);

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
