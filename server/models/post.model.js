import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
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

        imageContent: {
            type: String
        },

        stars: [
        {
            userId: String,
            stars: Number
        }
        ],

        comments: {
            type: [Array]
        }
    },
    {
        timestamps: true
    }
);

const postModel = mongoose.model("posts", postSchema);

export default postModel;
