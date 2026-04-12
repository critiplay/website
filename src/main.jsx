import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/base.css';

import React from 'react'
import {createRoot} from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { WebsiteLayout } from './layouts/website';

function Page1() {
    return (
        <div>   
            <h1>Hello CritiPlay - Page1</h1>
        </div>
    )
}

function Page2() {
    return (
        <div>   
            <h1>Hello CritiPlay - Page2</h1>
        </div>
    )
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <WebsiteLayout />,
        children: [
            {
                index: true,
                element: <Page1 />,
            },
            {
                path: "page1",
                element: <Page1 />,
            },
            {
                path: "page2",
                element: <Page2 />,
            }
        ]
    }

]);

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)