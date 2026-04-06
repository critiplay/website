import React from 'react'
import {createRoot} from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Link} from 'react-router-dom'

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
        element: <Page1 />,
    },
    {
        path: "/page1",
        element: <Page1 />,
    },
    {
        path: "/page2",
        element: <Page2 />,
    }

]);

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)