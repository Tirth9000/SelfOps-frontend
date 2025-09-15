import React from 'react'

export default function ServerRoom() {
  const servers = [
    { name: 'Server A', apps: ['app1', 'app2'] },
    { name: 'Server B', apps: ['service-x', 'service-y'] },
  ]
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Server Room</h2>
      <div className="space-y-4">
        {servers.map(s => (
          <div key={s.name} className="bg-white rounded shadow p-4">
            <h3 className="font-semibold">{s.name}</h3>
            <div className="mt-2 flex gap-3">
              {s.apps.map(a => (
                <div key={a} className="p-2 border rounded">{a}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
