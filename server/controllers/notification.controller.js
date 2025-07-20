import notificationModel from "../models/notification.model.js"

export const fetchNotifications = async(req,res)=>{
    try {
        const userId = req.userId

        const userNotifications = await notificationModel.find({ userId : userId}).sort({createdAt: -1})

        return res.status(200).json({
            success:true,
            userNotifications
        })
    } catch (error) {
        return res.json({
            message: error.message || error,
            error: true
        })
    }
}

export const checkIfUnread = async(req,res)=>{
    try {
    const userId = req.userId

    const unreadCount = await notificationModel.countDocuments({ userId, isRead: false })

    return res.status(200).json({
        success: true,
        hasUnread: unreadCount > 0,
        unreadCount
    })
    } catch (error) {
        return res.json({
            message: error.message || error,
            error: true
        })
    }
}

export const setAsRead = async (req,res)=>{
    try {
        const {id} = req.body

        await notificationModel.findOneAndUpdate({_id: id}, {isRead: true} )

        return res.status(200).json({
            
            success:true
        })
    } catch (error) {
        return res.json({
            message: error.message || error,
            error: true
        })
    }
}