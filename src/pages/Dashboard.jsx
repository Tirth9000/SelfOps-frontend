import React from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
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
          <h3 className="font-semibold">Containers</h3>
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
            <tr>
              <td className="p-2">web-frontend</td>
              <td className="p-2">Running</td>
              <td className="p-2">3%</td>
              <td className="p-2">120MB</td>
              <td className="p-2"><button className="px-2 py-1 border rounded">View</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
