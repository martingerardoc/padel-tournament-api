import express from "express";

import {
  getAllTournaments,
  getTournamentById,
  createTournament,
  updateTournament,
  deleteTournament
} from "../controllers/tournamentsController.js";

import { tournamentValidation } from "../validators/tournamentValidator.js";
import { validate } from "../middleware/validation.js";

import { ensureAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllTournaments);

router.get("/:id", getTournamentById);

router.post(
  "/",
  tournamentValidation,
  validate,
  createTournament,
  ensureAuthenticated
);

router.put(
  "/:id",
  tournamentValidation,
  validate,
  updateTournament,
  ensureAuthenticated
);

router.delete("/:id", deleteTournament, ensureAuthenticated);

export default router;