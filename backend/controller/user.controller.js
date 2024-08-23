import { User } from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const API_KEY = process.env.API_KEY;

export const signup = async (req, res) => {
    try {
        const { fullname, height, weight, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            fullname,
            height,
            weight,
            email,
            password: hashPassword
        });
        await createdUser.save();
        res.status(200).json({
            message: "User created successfully",
            user: {
                fullname: createdUser.fullname,
                email: createdUser.email,
                height: createdUser.height,
                weight: createdUser.weight
            }
        });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid user or password" });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid user or password" });
        }
        res.status(200).json({
            message: "Login successful",
            user: {
                fullname: user.fullname,
                email: user.email,
                height: user.height,
                weight: user.weight
            }
        });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// AI
export const getAIResponse = async (req, res) => {
    try {
        const { prompt } = req.body;
        
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const response = await model.generateContent(prompt);

        console.log("AI Response:", response);

        let aiResponse = "";
        if (response && response.response && response.response.text) {
            aiResponse = response.response.text();
        } else {
            throw new Error("Invalid response from AI model");
        }

        res.status(200).json({ message: "Success", data: aiResponse });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Diet plan information saving in backend
export const followDietPlan = async (req, res) => {
    try {
        const { planType, userEmail } = req.body;

        // Fetch user from the database
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Save diet plan to user's profile
        user.dietPlan = planType;
        await user.save();

        res.status(200).json({ message: "Diet plan followed successfully" });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Exercise information saving in backend
export const addExercise = async (req, res) => {
    try {
        const { email, exerciseType, date } = req.body;

        // Fetch user from the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Add exercise to user's profile
        user.exercises.push({ type: exerciseType, date: date || new Date() });
        await user.save();

        res.status(200).json({ message: "Exercise added successfully" });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};