const express = require("express");
// const RecipeModel = require("../src/app/recipes/recipe.model");

const app = express();

let recipes = [
  {
    name: "Cheeseburger",
    description: "Burger with cheese on a sesame seed bun",
    imagePath:
      "https://upload.wikimedia.org/wikipedia/commons/b/bf/2019-02-28_21_43_08_A_Burger_King_cheeseburger_in_Oak_Hill%2C_Fairfax_County%2C_Virginia.jpg",
    ingredients: [
      {
        name: "Meat",
        amount: 1,
      },
      {
        name: "Cheese",
        amount: 1,
      },
      {
        name: "Bun",
        amount: 1,
      },
    ],
  },
  {
    name: "Pepperoni Pizza",
    description: "The classic pizza",
    imagePath:
      "https://upload.wikimedia.org/wikipedia/commons/e/e1/Pepperoni_pizza_%282%29.png",
    ingredients: [
      {
        name: "Pepperoni",
        amount: 1,
      },
      {
        name: "Mozzarella Cheese",
        amount: 1,
      },
      {
        name: "Dough",
        amount: 1,
      },
      {
        name: "Pizza Sauce",
        amount: 1,
      },
    ],
  },
];

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/recipes", (req, res, next) => {
  const newRecipe = req.body;
  res.status(201).json({
    message: "Post added successfully!",
  });
});

app.get("/api/recipes", (req, res, next) => {
  res.status(200).json(recipes);
});

module.exports = app;
