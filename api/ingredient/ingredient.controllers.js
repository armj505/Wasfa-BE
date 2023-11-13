const Ingredient = require("../../models/Ingredient");

exports.getAllIngredient = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.find();
    return res.status(200).json(ingredients);
  } catch (error) {
    return next(error);
  }
};

exports.getIngredientById = async (req, res, next) => {
  try {
    const ingredient = await Ingredient.findById(req.params.ingredientId);
    return res.status(200).json(ingredient);
  } catch (error) {
    return next(error);
  }
};

exports.createIngredient = async (req, res, next) => {
  try {
    const newIngredient = await Ingredient.create(req.body);
    return res.status(201).json(newIngredient);
  } catch (error) {
    return next(error);
  }
};

exports.updtIngredient = async (req, res, next) => {
  try {
    const updtdIngredient = await Ingredient.findByIdAndUpdate(
      req.params.ingredientId,
      req.body,
      {
        new: true,
      }
    );
    return res.status(200).json(updtdIngredient);
  } catch (error) {
    return next(error);
  }
};

exports.delIngredient = async (req, res, next) => {
  try {
    await Ingredient.findByIdAndDelete(req.params.ingredientId);
    return res.status(200).json({ message: "Deleted" });
  } catch (error) {
    return next(error);
  }
};
