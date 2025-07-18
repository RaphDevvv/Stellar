import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        postId: {
            type: String
        },

        userAvatar: {
            type: String,
        },
        
        userName: {
            type: String,
            required: [true]
        },

        userId: {
            type: String,
            required: [true]
        },

        textContent: {
            type: String,
        },

        stars: [
        {
            userId: String,
            stars: Number
        }
        ],

    },
    {
        timestamps: true
    }
);

const commentModel = mongoose.model("comments", commentSchema);

export default commentModel;
