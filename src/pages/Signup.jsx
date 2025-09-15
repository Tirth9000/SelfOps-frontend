import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const nav = useNavigate()
  function onSubmit(e) {
    e.preventDefault()
    // TODO: connect backend
    nav('/dashboard')
  }
  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create account</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <input required className="w-full p-2 border rounded" placeholder="Full name" />
        <input required className="w-full p-2 border rounded" placeholder="Email" />
        <input required type="password" className="w-full p-2 border rounded" placeholder="Password" />
        <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded">Signup</button>
      </form>
    </div>
  )
}
