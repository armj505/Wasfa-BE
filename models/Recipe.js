const { model, Schema } = require("mongoose");

function imageGetter(val) {
  // Modify the value
  return `${process.env.BACKEND_URL}${val}`;
}

const RecipeSchema = new Schema({
  title: { type: String, required: true },
  serving: { type: String },
  instructions: [
    {
      title: { type: String, required: true },
      description: String,
      order: Number,
    },
  ],
  image: { type: String, get: imageGetter },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  ingredients: [
    {
      ingredient: { type: Schema.Types.ObjectId, ref: "Ingredient" },
      measurement: String,
      qty: String,
    },
  ],
  category: { type: Schema.Types.ObjectId, required: true, ref: "Category" },
});

// If you want to apply getters to every query, set this to true
RecipeSchema.set("toJSON", { getters: true });
RecipeSchema.set("toObject", { getters: true });

module.exports = model("Recipe", RecipeSchema);
