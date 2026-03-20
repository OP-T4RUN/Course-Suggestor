import "./config.js";

import express from "express";
import cors from "cors";
import passport from "./auth.js";

import loginRoutes from "./routes/login.js";
import googleRoutes from "./routes/googleAuthRoutes.js";
import roleRoute from "./routes/selectRole.js"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(passport.initialize());

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

// routes
app.use("/auth", loginRoutes);
app.use("/auth", googleRoutes);
app.use("/users", roleRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});