import React from 'react'
import Axios from '../utils/axios'
import summaryApi from '../common/summaryapi'
import { useState } from 'react'
import { useEffect } from 'react'
import Notification from '../components/Notification'
import { formatDistanceToNow } from 'date-fns'

const Notifications = () => {
    const [notifications, setNotifications] = useState([])
    const fetchNotifications = async ()=>{
        try {
            const res = await Axios({
                ...summaryApi.get_notifications
            })

            if (res.data.success) {
                setNotifications(res?.data?.userNotifications)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchNotifications()
        console.log(notifications)
    },[])
  return (
    <div className='flex flex-col gap-5'>
        {notifications .length > 0 && notifications.map((notification, index) => (
        <Notification
            key={index}
            id={notification._id}
            postId={notification.postId}
            message={notification.message}
            type={notification.type}
            fromUser={notification.fromUser}
            commentText={notification.commentText}
            postPicture={notification.postPicture}
            createdAt={notification.createdAt}
            isRead={notification.isRead}
        />
        ))}

    </div>
  )
}

export default Notifications
