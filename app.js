const express = require("express");
const app = express();
const errorHandler = require("./middleware/erroHandler");
const notFoundHandler = require("./middleware/notFoundHandler");
const connectDB = require("./database");
const morgan = require("morgan");
const cors = require("cors");
const userRouter = require("./api/user/user.routes");
const categoryRouter = require("./api/category/category.routes");
const recipeRouter = require("./api/recipe/recipe.routes");
const IngredientRouter = require("./api/ingredient/ingredient.routes");
const passport = require("passport");
const { jwtStrategy, localStrategy } = require("./middleware/passport");

connectDB();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use(jwtStrategy);

app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/recipe", recipeRouter);
app.use("/api/ingredient", IngredientRouter);

// Middleware
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(process.env.PORT, () => {
  console.log("Server is listening to Port " + process.env.PORT);
});
