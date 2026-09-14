import express from "express";

import {
  getAllTournaments,
  getTournamentById,
  createTournament
} from "../controllers/tournamentsController.js";

import { tournamentValidation } from "../validators/tournamentValidator.js";
import { validate } from "../middleware/validation.js";

const router = express.Router();

router.get("/", getAllTournaments);

router.get("/:id", getTournamentById);

router.post(
  "/",
  tournamentValidation,
  validate,
  createTournament
);

export default router;