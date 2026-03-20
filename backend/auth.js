import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import pool from "./db.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value;
                const googleId = profile.id;

                let user = await pool.query(
                    "SELECT * FROM user_credentials WHERE google_id = $1",
                    [googleId]
                );

                if (user.rows.length > 0) {
                    return done(null, user.rows[0]);
                }

                user = await pool.query(
                    "SELECT * FROM user_credentials WHERE email = $1",
                    [email]
                );

                if (user.rows.length > 0) {
                    const updatedUser = await pool.query(
                        "UPDATE user_credentials SET google_id = $1 WHERE email = $2 RETURNING *",
                        [googleId, email]
                    );

                    return done(null, updatedUser.rows[0]);
                }

                const newUser = await pool.query(
                    "INSERT INTO user_credentials (email, password, google_id, role) VALUES ($1, $2, $3, $4) RETURNING *",
                    [email, null, googleId, "pending"]
                );

                return done(null, newUser.rows[0]);

            } catch (err) {
                return done(err, null);
            }
        }
    )
);

export default passport;