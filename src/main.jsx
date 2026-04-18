import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/base.css';

import React from 'react'
import {createRoot} from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { WebsiteLayout } from './layouts/website';
import CompareReview from './pages/compare_review';
import Accuracy from './pages/accuracy';
import Home from './pages/home';
import { I18nProvider, useI18n } from './i18n';





const router = createBrowserRouter([
    {
        path: "/",
        element: <WebsiteLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "reviews",
                element: <Navigate to="/reviews/1" replace />,
            },
            {
                path: "reviews/:page",
                element: <CompareReview />,
            },
            {
                path: "accuracy",
                element: <Navigate to="/accuracy/1" replace />,
            },
            {
                path: "accuracy/:page",
                element: <Accuracy />,
            }
        ]
    }

]);

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <I18nProvider>
            <RouterProvider router={router} />
        </I18nProvider>
    </React.StrictMode>
)