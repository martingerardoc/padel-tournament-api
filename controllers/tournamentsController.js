import { ObjectId } from "mongodb";
import { getDb } from "../db/connect.js";

const collectionName = "tournaments";

export const getAllTournaments = async (req, res) => {
  try {
    const db = getDb();

    const tournaments = await db
      .collection(collectionName)
      .find()
      .toArray();

    res.status(200).json(tournaments);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "An error occurred while retrieving tournaments."
    });
  }
};

export const getTournamentById = async (req, res) => {
  try {
    const db = getDb();

    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid tournament ID."
      });
    }

    const tournament = await db
      .collection(collectionName)
      .findOne({
        _id: new ObjectId(id)
      });

    if (!tournament) {
      return res.status(404).json({
        message: "Tournament not found."
      });
    }

    res.status(200).json(tournament);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "An error occurred while retrieving the tournament."
    });
  }
};

export const createTournament = async (req, res) => {
  try {
    const db = getDb();

    const newTournament = {
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      category: req.body.category,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      maxTeams: Number(req.body.maxTeams),
      status: req.body.status,
      entryFee: Number(req.body.entryFee),
      createdAt: new Date()
    };

    const result = await db
      .collection(collectionName)
      .insertOne(newTournament);

    res.status(201).json({
      message: "Tournament created successfully.",
      tournamentId: result.insertedId
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "An error occurred while creating the tournament."
    });
  }
};