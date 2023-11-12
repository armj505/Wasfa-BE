const Recipe = require("../../models/Recipe");

exports.getRecipies = async (req, res, next) => {
  try {
    const allRecipes = await Recipe.find();
    return res.status(200).json(allRecipes);
  } catch (error) {
    return next(error);
  }
};

exports.getOneRecipies = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const recipe = await Recipe.findById(recipeId);
    return res.status(200).json(recipe);
  } catch (error) {
    return next(error);
  }
};

exports.createRecipe = async (req, res, next) => {
  try {
    await Recipe.create(req.body);
    return res.status(201).json({ message: "Recipe Created!" });
  } catch (error) {
    return next(error);
  }
};

exports.updateRecipe = async;

// router.get("/recipe", getRecipies);
// router.get("/recipe/:recipeId", getOneRecipe);
// router.post(
//   "/recipe",
//   passport.authenticate("jwt", { session: false }),
//   createRecipe
// );
// router.put(
//   "/recipe/:recipeId",
//   passport.authenticate("jwt", { session: false }),
//   updateRecipe
// );
// router.delete(
//   "/recipe/:recipeId",
//   passport.authenticate("jwt", { session: false }),
//   deleteRecipe
// );
