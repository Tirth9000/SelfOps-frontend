import React, { useState } from 'react'

export default function Cli() {
  const [history, setHistory] = useState(["Welcome to SelfOps CLI (Web version)"])
  const [command, setCommand] = useState("")

  function runCommand(e) {
    e.preventDefault()
    if (!command.trim()) return
    setHistory([...history, `> ${command}`, `Output: (simulated) result of "${command}"`])
    setCommand("")
  }

  return (
    <div className="max-w-3xl mx-auto mt-6 bg-black text-green-400 p-4 rounded-lg font-mono">
      <div className="h-80 overflow-y-auto mb-4">
        {history.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      <form onSubmit={runCommand} className="flex">
        <span className="text-white mr-2">$</span>
        <input
          className="flex-1 bg-black text-green-400 outline-none"
          value={command}
          onChange={e => setCommand(e.target.value)}
          placeholder="Enter command..."
        />
      </form>
    </div>
  )
}
