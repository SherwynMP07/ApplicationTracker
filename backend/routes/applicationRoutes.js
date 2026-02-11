import express from "express";
import { addApplication,getApplications,editApplication,fetchSingleApplication,removeApplication } from "../controllers/applicationController.js";
import authMiddleware from "../middleware/authMiddleware.js";
i

const router = express.Router();

router.post("/",authMiddleware, addApplication);
router.get('/',authMiddleware,getApplications);
router.get("/:id",authMiddleware,fetchSingleApplication);
router.put("/:id", authMiddleware, editApplication);
router.delete("/:id", authMiddleware, removeApplication);

export default router;