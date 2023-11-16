const Recipe = require("../../models/Recipe");
const User = require("../../models/User");
const Category = require("../../models/Category");
const Ingredient = require("../../models/Ingredient");

// GET

exports.getRecipes = async (req, res, next) => {
  try {
    const allRecipes = await Recipe.find().populate("category");
    return res.status(200).json(allRecipes);
  } catch (error) {
    return next(error);
  }
};

exports.getOneRecipe = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const recipe = await Recipe.findById(recipeId).populate([
      "user",
      "category",
      "ingredients",
    ]);
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
      return res.status(200).json(user.recipes);
    }
    return res.status(404).json({ message: "User Not Found" });
  } catch (error) {
    return next(error);
  }
};

// POST

exports.createRecipe = async (req, res, next) => {
  try {
    let image;
    if (req.file) {
      image = req.file.path;
    }
    const recipe = await Recipe.create({ ...req.body, image });
    const user = await User.findById(req.user._id);
    const category = await Category.findById(recipe.category);
    const ingredientList = await recipe.ingredients;
    ingredientList.forEach(async (ing) => {
      const ingredient = await Ingredient.findById(ing.ingredient);
      await ingredient.updateOne({ $push: { recipes: recipe } });
    });
    await user.updateOne({ $push: { recipes: recipe } });
    await recipe.updateOne({ user: user._id });
    await category.updateOne({ $push: { recipes: recipe } });

    return res.status(201).json(recipe);
  } catch (error) {
    return next(error);
  }
};

// PUT

exports.updateRecipe = async (req, res, next) => {
  try {
    let image;
    if (req.file) {
      image = req.file.path;
    }
    const { recipeId } = req.params;
    await Recipe.findByIdAndUpdate(recipeId, { ...req.body, image });
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
