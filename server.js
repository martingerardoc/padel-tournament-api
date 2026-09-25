import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import session from "express-session";
import passport from "./config/passport.js";
import authRoutes from "./routes/auth.js";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" with { type: "json" };
import tournamentRoutes from "./routes/tournaments.js";
import playerRoutes from "./routes/players.js";
import { initDb } from "./db/connect.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: "padel-tournament-session-secret",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.get("/", (req, res) => {
  res.json({
    message: "Padel Tournament API is running"
  });
});

app.use("/auth", authRoutes);

app.use("/api/tournaments", tournamentRoutes);

app.use("/api/players", playerRoutes);



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