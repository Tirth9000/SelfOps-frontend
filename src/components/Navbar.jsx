import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-xl font-semibold">SelfOps</Link>
        <nav className="space-x-4">
          <Link to="/dashboard" className="text-sm">Dashboard</Link>
          <Link to="/server-room" className="text-sm">Server Room</Link>
          <Link to="/register" className="text-sm">Register App</Link>
          <Link to="/login" className="text-sm">Login</Link>
        </nav>
      </div>
    </header>
  )
}
