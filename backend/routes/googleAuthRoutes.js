import { Router } from "express";
import passport from "../auth.js";
import { generateToken } from "../utils/jwt.js";

const router = Router();

// redirect to google
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false
    })
);

// callback
router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "/login"
    }),
    (req, res) => {
        const token = generateToken(req.user);

        // send token (simple version)
        res.json({ token });

        // better (frontend redirect):
        // res.redirect(`http://localhost:3000/oauth-success?token=${token}`);
    }
);

export default router;