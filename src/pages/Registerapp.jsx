import React from 'react'

export default function RegisterApp() {
  function onSubmit(e) {
    e.preventDefault()
    alert('App registered (placeholder)')
  }
  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Register Application</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <input className="w-full p-2 border rounded" placeholder="Project name" />
        <textarea className="w-full p-2 border rounded" placeholder="Paste docker-compose.yml or Dockerfile"></textarea>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">Register</button>
      </form>
    </div>
  )
}
