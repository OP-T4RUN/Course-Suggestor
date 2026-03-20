import { Router } from "express";
import { authMiddleware } from "../middleware/jwtAuth";

const router = Router();

router.post("/target", authMiddleware, async (req, res) => {
    try{
        const { target_role, location } = req.body;



    }catch(err){
        res.status(500).json({ msg: "Server error" });
    }
});

export default router;