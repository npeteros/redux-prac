import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './assets/lib/store.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './assets/pages/Login.jsx'
import Register from './assets/pages/Register.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<App />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
            </BrowserRouter>
        </Provider>
  </React.StrictMode>,
)
