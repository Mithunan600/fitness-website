import express from "express";
import { signin, signup, getAIResponse, followDietPlan,addExercise } from "../controller/user.controller.js";
const router = express.Router();
router.post("/signin", signin);
router.post("/signup", signup);
router.post('/ai-query', getAIResponse);
router.post("/api/followDietPlan", followDietPlan);
router.post("/api/addExercise", addExercise); 
export default router;
