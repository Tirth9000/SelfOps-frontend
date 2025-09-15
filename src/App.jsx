import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import RegisterApp from './pages/RegisterApp'
import Dashboard from './pages/Dashboard'
import ServerRoom from './pages/ServerRoom'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/register" element={<RegisterApp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/server-room" element={<ServerRoom />} />
        </Routes>
      </main>
    </div>
  )
}
