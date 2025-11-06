import React from 'react'
import { Link, useParams } from 'react-router-dom'

export default function AppDetails() {
  const { appId } = useParams()

  // Mock container data for this app
  const containers = [
    { id: "1", name: "frontend", status: "running" },
    { id: "2", name: "backend", status: "stopped" }
  ]

  const inviteUrl = `${window.location.origin}/app/${appId}`

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Application — {appId}</h2>

      {/* Invite URL Section */}
      <div className="bg-white rounded shadow p-4 mb-6">
        <h3 className="font-semibold mb-2">Invite URL</h3>
        <input
          className="w-full p-2 border rounded"
          value={inviteUrl}
          readOnly
          onClick={e => e.target.select()}
        />
        <p className="text-sm text-gray-500 mt-1">Share this link to invite others to view this app.</p>
      </div>

      {/* Containers Section */}
      <div className="space-y-3">
        {containers.map(c => (
          <div
            key={c.id}
            className="p-4 bg-white rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{c.name}</p>
              <p className="text-sm text-gray-500">Status: {c.status}</p>
            </div>
            <Link
              to={`/app/${appId}/container/${c.id}`}
              className="px-3 py-1 bg-indigo-600 text-white rounded"
            >
              View Logs & Metrics
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
