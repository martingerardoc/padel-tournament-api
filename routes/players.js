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

const router = express.Router();

router.get("/", getAllPlayers);

router.get("/:id", getPlayerById);

router.post(
  "/",
  playerValidation,
  validate,
  createPlayer
);
router.put(
  "/:id",
  playerValidation,
  validate,
  updatePlayer
);

router.delete(
  "/:id",
  deletePlayer
);

export default router;