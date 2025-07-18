export const baseUrl = import.meta.env.VITE_API_URL

const summaryApi = {
    get_posts : {
        url : '/api/posts/get',
        method: 'get'
    },

        most_liked_posts : {
        url : '/api/posts/most-liked',
        method: 'get'
    },

    upload_posts : {
        url : '/api/posts/upload',
        method: 'post'
    },

    rate_posts : {
        url : '/api/posts/rate',
        method: 'put'
    },

     post_comment : {
        url : '/api/posts/post-comment',
        method: 'post'
    },

    
     fetch_comments : {
        url : '/api/posts/fetch-comments',
        method: 'post'
    },

    register : {
        url : '/api/user/register',
        method: 'post'
    },

    login : {
        url : '/api/user/login',
        method: 'post'
    },

        logout : {
        url : '/api/user/logout',
        method: 'post'
    },

    get_user : {
         url : '/api/user/get',
        method: 'get'
    },

    upload_avatar : {
        url : '/api/user/avatar',
        method: 'post'
    },

    upload_image : {
        url: '/api/image/upload',
        method: 'post'
    },

     get_user_posts : {
         url : '/api/user/get-posts',
        method: 'post'
    },

    edit_user : {
        url : '/api/user/edit',
        method : 'put'
    },

    info_by_name : {
        url : '/api/user/get-info-by-name',
        method: 'post'
    },

        follow_user : {
        url : '/api/user/follow',
        method: 'post'
    }
}

export default summaryApi