import React from 'react'
import { Link } from 'react-router-dom'

export default function ServerRoom() {
  // Mock apps (in future this will come from backend/CLI)
  const apps = [
    { id: "app1", name: "Frontend App" },
    { id: "app2", name: "Backend API" }
  ]

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Server Room</h2>
      <div className="space-y-4">
        {apps.map(app => (
          <div key={app.id} className="bg-white rounded shadow p-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{app.name}</h3>
              <p className="text-sm text-gray-500">ID: {app.id}</p>
            </div>
            <Link
              to={`/app/${app.id}`}
              className="px-3 py-1 bg-indigo-600 text-white rounded"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
