import express from "express";
import passport from "../config/passport.js";

const router = express.Router();

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"]
  })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/auth/login"
  }),
  (req, res) => {
    res.json({
      message: "GitHub authentication successful.",
      user: req.user
    });
  }
);

router.get("/login", (req, res) => {
  res.status(401).json({
    message: "GitHub authentication failed."
  });
});

router.get("/logout", (req, res) => {
  req.logout((error) => {
    if (error) {
      return res.status(500).json({
        message: "Logout failed."
      });
    }

    req.session.destroy(() => {
      res.json({
        message: "Logout successful."
      });
    });
  });
});

router.get("/status", (req, res) => {
  res.json({
    authenticated: req.isAuthenticated(),
    user: req.user || null
  });
});

export default router;