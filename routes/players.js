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
  ensureAuthenticated,
  playerValidation,
  validate,
  createPlayer,
  
);
router.put(
  "/:id",
  ensureAuthenticated,
  playerValidation,
  validate,
  updatePlayer,
  
);

router.delete(
  "/:id",
  deletePlayer,
  ensureAuthenticated
);

export default router;