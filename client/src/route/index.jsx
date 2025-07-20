import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Auth from '../pages/Auth';
import Profile from '../pages/Profile';
import OtherProfiles from '../pages/OtherProfiles';
import Explore from '../pages/Explore';
import Notifications from '../pages/Notifications';
import FullPost from '../pages/FullPost';

const router = createBrowserRouter([

    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <Home/>,
                children: [
                    {
                        path: "/profile",
                        element: <Profile/>
                    },

                    {
                        path: "/profile/:name",
                        element: <OtherProfiles/>
                    },

                    
                    {
                        path: "/explore",
                        element: <Explore/>
                    },

                    {
                        path: "/notifications",
                        element: <Notifications/>
                    },

                    {
                        path: "/post/:id",
                        element: <FullPost/>
                    }
                ]
            },

         {
                path: "auth",
                element: <Auth/>
            }
        ]
    }
])

export default router