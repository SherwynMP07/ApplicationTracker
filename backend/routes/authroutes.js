import express from "express";
import { registerUser,loginUser } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Protected route working", user: req.user });
});
router.post("/register",registerUser);
router.post("/login",loginUser);

export default router;