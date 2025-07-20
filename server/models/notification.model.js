import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },

    type: { type: String, enum: ['comment', 'post', 'follow'], required: true },

    message: {type: String},

    fromUser: {type: Object},

    commentText: {type: String},

    postId: {type: String},

    postPicture: {type: String},

    isRead: {type: Boolean, default: false}
}, {timestamps: true})

const notificationModel = mongoose.model("notifications", notificationSchema)

export default notificationModel