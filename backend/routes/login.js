import { Router } from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

const router = Router();

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const existingUser = await pool.query(
            "SELECT * FROM user_credentials WHERE email = $1",
            [email]
        );

        const allowedRoles = ["mentor", "learner"];
        if (!allowedRoles.includes(role)) {
            return res.status(400).json({ msg: "Invalid role" });
        }

        if (existingUser.rows.length > 0) {
            return res.status(409).json({ msg: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            "INSERT INTO user_credentials (email, password, role) VALUES ($1, $2, $3) RETURNING *",
            [email, hashedPassword, role]
        );

        const token = generateToken(newUser.rows[0]);

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await pool.query(
            "SELECT * FROM user_credentials WHERE email = $1",
            [email]
        );

        if (user.rows.length === 0) {
            return res.status(400).json({ msg: "User not found" });
        }

        const valid = await bcrypt.compare(password, user.rows[0].password);

        if (!valid) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const token = generateToken(user.rows[0]);

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

export default router;