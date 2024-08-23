import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import userRoute from "./route/user.route.js";
import cors from "cors"; 

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors()); 

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// Connection to MongoDB
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(error => {
    console.log("Error connecting to MongoDB:", error);
});

app.use("/user", userRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
