import { body } from "express-validator";

export const tournamentValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Tournament name is required.")
    .isLength({ min: 3 })
    .withMessage("Tournament name must be at least 3 characters long."),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required."),

  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required."),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required.")
    .isIn(["Beginner", "Intermediate", "Advanced"])
    .withMessage(
      "Category must be Beginner, Intermediate, or Advanced."
    ),

  body("startDate")
    .isISO8601()
    .withMessage("Start date must be a valid date."),

  body("endDate")
    .isISO8601()
    .withMessage("End date must be a valid date."),

  body("maxTeams")
    .isInt({ min: 2 })
    .withMessage("Maximum teams must be an integer of at least 2."),

  body("status")
    .trim()
    .notEmpty()
    .withMessage("Status is required.")
    .isIn(["registration", "in-progress", "completed", "cancelled"])
    .withMessage(
      "Status must be registration, in-progress, completed, or cancelled."
    ),

  body("entryFee")
    .isFloat({ min: 0 })
    .withMessage("Entry fee must be a number greater than or equal to 0.")
];