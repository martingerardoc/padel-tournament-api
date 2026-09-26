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
  ensureAuthenticated,
  tournamentValidation,
  validate,
  createTournament,
  
);

router.put(
  "/:id",
  ensureAuthenticated,
  tournamentValidation,
  validate,
  updateTournament,
  
);

router.delete("/:id", ensureAuthenticated, deleteTournament);

export default router;