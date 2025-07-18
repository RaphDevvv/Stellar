import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Provide your name']
        },

        email: {
            type: String,
            required: [true, 'Provide your email'],
            unique: true
        },

        password: {
            type: String,
            required: [true, 'Provide your password']
        },

        avatar: {
            type: String,
            default: ""
        },

        followers: {
            type: Array,
            default: []
        },
        
        role: {
            type: String,
            enum: ["ADMIN", "USER"],
            default: "USER"
        }
    },
    {
        timestamps: true
    }
);

const userModel = mongoose.model("usu", userSchema);

export default userModel;
