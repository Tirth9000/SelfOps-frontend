import React from 'react'
import { useParams } from 'react-router-dom'

export default function ContainerDetails() {
  const { appId, containerId } = useParams()

  // Mock metrics/logs
  const logs = [
    "Container started successfully...",
    "Listening on port 3000",
    "Received request GET /api/data"
  ]

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        Container {containerId} (App: {appId})
      </h2>

      <div className="bg-white rounded shadow p-4 mb-4">
        <h3 className="font-semibold mb-2">Metrics</h3>
        <p>CPU: 3%</p>
        <p>Memory: 120MB</p>
        <p>Status: Running</p>
      </div>

      <div className="bg-black text-green-400 font-mono p-4 rounded h-64 overflow-y-auto">
        {logs.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  )
}
