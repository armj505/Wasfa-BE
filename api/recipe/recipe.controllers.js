const Recipe = require("../../models/Recipe");
const User = require("../../models/User");

// GET

exports.getRecipes = async (req, res, next) => {
  try {
    const allRecipes = await Recipe.find();
    return res.status(200).json(allRecipes);
  } catch (error) {
    return next(error);
  }
};

exports.getOneRecipe = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const recipe = await Recipe.findById(recipeId);
    return res.status(200).json(recipe);
  } catch (error) {
    return next(error);
  }
};

exports.getUserRecipes = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (user) {
      np;
      return res.status(200).json(user.recipes);
    }
    return res.status(404).json({ message: "User Not Found" });
  } catch (error) {
    return next(error);
  }
};

exports.getOneUserRecipe = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { recipeId } = req.params;
    const user = await User.findById(userId);
    if (user) {
      await user.recipes.findById(recipeId);
    }
    return res.status(404).json({ message: "User Not Found" });
  } catch (error) {
    return next(error);
  }
};

// POST

exports.createRecipe = async (req, res, next) => {
  try {
    await Recipe.create(req.body);
    return res.status(201).json({ message: "Recipe Created!" });
  } catch (error) {
    return next(error);
  }
};

// PUT

exports.updateRecipe = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    await Recipe.findByIdAndUpdate(recipeId, req.body);
    return res.status(204).json({ message: "Recipe Updated" });
  } catch (error) {
    return next(error);
  }
};

// DELETE

exports.deleteRecipe = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    await Recipe.findByIdAndDelete(recipeId, req.body);
    return res.status(204).json({ message: "Recipe Deleted" });
  } catch (error) {
    return next(error);
  }
};
