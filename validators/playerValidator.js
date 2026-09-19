import { body } from "express-validator";

export const playerValidation = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required.")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long."),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required.")
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters long."),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Email must be valid."),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone is required."),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required.")
    .isIn(["Beginner", "Intermediate", "Advanced"])
    .withMessage(
      "Category must be Beginner, Intermediate, or Advanced."
    ),

  body("ranking")
    .isInt({ min: 1 })
    .withMessage("Ranking must be an integer greater than 0."),

  body("active")
    .isBoolean()
    .withMessage("Active must be true or false.")
];