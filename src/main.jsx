import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import Home from './routes/Home'
import Pokedex from './routes/Pokedex'
import ErrorPage from './routes/ErrorPage'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/pokedex/:id",
        element: <Pokedex />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
)
