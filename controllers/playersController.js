import { ObjectId } from "mongodb";
import { getDb } from "../db/connect.js";

const collectionName = "players";

export const getAllPlayers = async (req, res) => {
  try {
    const db = getDb();

    const players = await db
      .collection(collectionName)
      .find()
      .toArray();

    res.status(200).json(players);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "An error occurred while retrieving players."
    });
  }
};

export const getPlayerById = async (req, res) => {
  try {
    const db = getDb();

    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid player ID."
      });
    }

    const player = await db
      .collection(collectionName)
      .findOne({
        _id: new ObjectId(id)
      });

    if (!player) {
      return res.status(404).json({
        message: "Player not found."
      });
    }

    res.status(200).json(player);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "An error occurred while retrieving the player."
    });
  }
};

export const createPlayer = async (req, res) => {
  try {
    const db = getDb();

    const newPlayer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      category: req.body.category,
      ranking: Number(req.body.ranking),
      active: req.body.active,
      createdAt: new Date()
    };

    const result = await db
      .collection(collectionName)
      .insertOne(newPlayer);

    res.status(201).json({
      message: "Player created successfully.",
      playerId: result.insertedId
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "An error occurred while creating the player."
    });
  }
};
export const updatePlayer = async (req, res) => {
  try {
    const db = getDb();

    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid player ID."
      });
    }

    const updatedPlayer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      category: req.body.category,
      ranking: Number(req.body.ranking),
      active: req.body.active
    };

    const result = await db
      .collection(collectionName)
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: updatedPlayer
        }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Player not found."
      });
    }

    res.status(200).json({
      message: "Player updated successfully."
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "An error occurred while updating the player."
    });
  }
};

export const deletePlayer = async (req, res) => {
  try {
    const db = getDb();

    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid player ID."
      });
    }

    const result = await db
      .collection(collectionName)
      .deleteOne({
        _id: new ObjectId(id)
      });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Player not found."
      });
    }

    res.status(200).json({
      message: "Player deleted successfully."
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "An error occurred while deleting the player."
    });
  }
};