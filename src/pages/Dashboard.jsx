import React from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  // Mock apps
  const apps = [
    { id: "app1", name: "Frontend App", status: "running", cpu: "3%", mem: "120MB" },
    { id: "app2", name: "Backend API", status: "stopped", cpu: "0%", mem: "0MB" }
  ]

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">Running Containers<br/><strong>12</strong></div>
        <div className="p-4 bg-white rounded shadow">Stopped Containers<br/><strong>2</strong></div>
        <div className="p-4 bg-white rounded shadow">Last Sync<br/><strong>Now</strong></div>
      </div>

      <div className="bg-white rounded shadow p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Applications</h3>
          <Link to="/register" className="text-sm text-indigo-600">Register new app</Link>
        </div>
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="text-sm text-gray-500">
              <th className="p-2">Name</th>
              <th className="p-2">Status</th>
              <th className="p-2">CPU%</th>
              <th className="p-2">Memory</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {apps.map(app => (
              <tr key={app.id}>
                <td className="p-2">{app.name}</td>
                <td className="p-2">{app.status}</td>
                <td className="p-2">{app.cpu}</td>
                <td className="p-2">{app.mem}</td>
                <td className="p-2">
                  <Link
                    to={`/app/${app.id}`}
                    className="px-2 py-1 bg-indigo-600 text-white rounded"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
