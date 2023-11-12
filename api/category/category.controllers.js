const Category = require("../../models/Category");

exports.getAllCategory = async (req, res, next) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    return next(error);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    return res.status(200).json(category);
  } catch (error) {
    return next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body);
    return res.status(201).json(newCategory);
  } catch (error) {
    return next(error);
  }
};

exports.updtCategory = async (req, res, next) => {
  try {
    const updtdCategory = await Category.findByIdAndUpdate(
      req.params.categoryId,
      req.body,
      {
        new: true,
      }
    );
    return res.status(200).json(updtdCategory);
  } catch (error) {
    return next(error);
  }
};

exports.delCategory = async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.categoryId);
    return res.status(200).json({ message: "Deleted" });
  } catch (error) {
    return next(error);
  }
};
