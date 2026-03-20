import { Router } from "express";
import { authMiddleware } from "../middleware/jwtAuth";

const router = Router();

router.post("/target", authMiddleware, async (req, res) => {
    try{
        const { email, target_role, location } = req.body;

        await pool.query(`SELECT id FROM user_credentials WHERE email = $1
            INSERT INTO user_targets VALUES($2, $3)`, [email, target_role, location])

    }catch(err){
        res.status(500).json({ msg: "Server error" });
    }
});

export default router;