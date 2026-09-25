import express from "express";

import {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer
} from "../controllers/playersController.js";

import { playerValidation } from "../validators/playerValidator.js";
import { validate } from "../middleware/validation.js";
import { ensureAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllPlayers);

router.get("/:id", getPlayerById);

router.post(
  "/",
  playerValidation,
  validate,
  createPlayer,
  ensureAuthenticated
);
router.put(
  "/:id",
  playerValidation,
  validate,
  updatePlayer,
  ensureAuthenticated
);

router.delete(
  "/:id",
  deletePlayer,
  ensureAuthenticated
);

export default router;