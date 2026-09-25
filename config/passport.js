import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github";
import { getDb } from "../db/connect.js";

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const db = getDb();

        const usersCollection = db.collection("users");

        let user = await usersCollection.findOne({
          githubId: profile.id
        });

        if (!user) {
          const newUser = {
            githubId: profile.id,
            username: profile.username,
            displayName: profile.displayName,
            profileUrl: profile.profileUrl,
            createdAt: new Date()
          };

          const result = await usersCollection.insertOne(newUser);

          user = {
            _id: result.insertedId,
            ...newUser
          };
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const db = getDb();

    const user = await db.collection("users").findOne({
      _id: id
    });

    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;