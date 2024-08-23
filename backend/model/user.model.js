import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dietPlan: {
        type: String,
        default: ''
    },
    exercises: {
        type: [{
            type: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                required: true,
                default: Date.now
            }
        }],
        default: []
    }
});

const User = mongoose.model("User", userSchema);

export { User, userSchema };

const aiInteractionSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    query: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const AIInteraction = mongoose.model("AIInteraction", aiInteractionSchema);

export { AIInteraction };
