import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import tournamentRoutes from "./routes/tournaments.js";
import { initDb } from "./db/connect.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Padel Tournament API is running"
  });
});

app.use("/api/tournaments", tournamentRoutes);

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });