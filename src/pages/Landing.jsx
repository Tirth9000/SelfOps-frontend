import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <section className="text-center py-16">
      <h1 className="text-4xl font-bold mb-4">SelfOps — Lightweight container monitoring</h1>
      <p className="mb-6 max-w-xl mx-auto">Monitor and manage Docker & Kubernetes apps with CLI + Web UI.</p>
      <div className="space-x-4">
        <Link to="/signup" className="px-4 py-2 bg-indigo-600 text-white rounded">Get Started</Link>
        <Link to="/login" className="px-4 py-2 border rounded">Login</Link>
      </div>
    </section>
  )
}
