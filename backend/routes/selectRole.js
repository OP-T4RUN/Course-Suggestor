import { Router } from "express";
import pool from "../db.js";
import { authMiddleware } from "../middleware/jwtAuth.js";

const router = Router();

router.get("/checkrole", async (req, res) => {
    const { email } = req.body;

    const pendingroles = await pool.query(`SELECT role FROM user_credentials WHERE email = $1 `, [email]);

    if (role.rows[0] == 'pending') res.status(200).json({ msg: "Pending" });
    else res.status(201).json({ msg: "Not Pending" });

});

router.patch("/role", authMiddleware, async (req, res) => {
    try {
        const { role } = req.body;

        const allowedRoles = ["mentor", "learner"];

        if (!allowedRoles.includes(role)) {
            return res.status(400).json({ msg: "Invalid role" });
        }

        const updatedUser = await pool.query(
            `UPDATE user_credentials
             SET role = $1
             WHERE id = $2 AND role = 'pending'
             RETURNING *`,
            [role, req.user.id]
        );

        if (updatedUser.rows.length === 0) {
            return res.status(400).json({ msg: "Role already set" });
        }

        const token = generateToken(updatedUser.rows[0]);

        res.json({
            user: updatedUser.rows[0],
            token
        });

    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

export default router;