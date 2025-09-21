// src/components/Dashboard.jsx
import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [metric, setMetric] = useState("cpu");

  const chartData = {
    labels: ["t-5m", "t-4m", "t-3m", "t-2m", "t-1m", "now"],
    datasets: [
      {
        label: "nginx-server",
        data:
          metric === "cpu"
            ? [30, 40, 50, 45, 42, 45]
            : metric === "memory"
            ? [20, 22, 25, 28, 30, 32]
            : [50, 60, 55, 70, 65, 80],
        borderColor: "#1f2937", // Dark gray consistent with theme
        fill: false,
        tension: 0.3,
      },
      {
        label: "db-container",
        data:
          metric === "cpu"
            ? [10, 0, 0, 0, 0, 0]
            : metric === "memory"
            ? [0, 0, 0, 0, 0, 0]
            : [10, 12, 10, 15, 20, 22],
        borderColor: "#4b5563", // Slightly lighter gray
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: "top" } },
    scales: { y: { beginAtZero: true, max: 100 } },
    animation: { duration: 1000, easing: "easeOutQuart" },
  };

  const cards = [
    {
      name: "nginx-app",
      id: "1a2b3c4d",
      status: "running",
      health: "healthy",
      image: "nginx:1.25",
      uptime: "2h 14m",
      restarts: 1,
      cpu: "12.5%",
      memory: "256MB / 1GB",
      net: "12.4MB / 8.9MB",
      ports: "80→8080, 443→8443",
      update: "1.26",
    },
    {
      name: "redis-cache",
      id: "5e6f7g8h",
      status: "exited",
      health: "unhealthy",
      image: "redis:7.0",
      uptime: "-",
      restarts: 3,
      cpu: "0%",
      memory: "0MB / 512MB",
      net: "0MB / 0MB",
      ports: "6379→6379",
    },
    {
      name: "nginx-app",
      id: "1a2b3c4d",
      status: "running",
      health: "healthy",
      image: "nginx:1.25",
      uptime: "2h 14m",
      restarts: 1,
      cpu: "12.5%",
      memory: "256MB / 1GB",
      net: "12.4MB / 8.9MB",
      ports: "80→8080, 443→8443",
      update: "1.26",
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📊 SelfOps - Container Dashboard</h1>

      {/* Top Graph */}
      <motion.div
        className="bg-white p-6 rounded-2xl shadow mb-8 w-full"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex gap-2 mb-4">
          {["cpu", "memory", "network"].map((m) => (
            <button
              key={m}
              className={`px-4 py-2 rounded-xl font-medium text-sm ${
                metric === m
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              } transition`}
              onClick={() => setMetric(m)}
            >
              {m.toUpperCase()}
            </button>
          ))}
        </div>
        <div style={{ height: "500px" }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </motion.div>

      {/* Container Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{c.name}</h3>
                <p className="text-gray-500 text-sm">ID: {c.id}</p>
              </div>
              <div className="flex gap-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    c.status === "running"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  ● {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    c.health === "healthy"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {c.health === "healthy" ? "✓ Healthy" : "✕ Unhealthy"}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                🖼 {c.image}{" "}
                {c.update && (
                  <span className="bg-yellow-100 text-yellow-700 px-1 rounded text-xs font-semibold">
                    Update → {c.update}
                  </span>
                )}
              </p>
              <p>⏱ Uptime: {c.uptime}</p>
              <p>🔄 Restarts: {c.restarts}</p>
              <p>💻 CPU: {c.cpu}</p>
              <p>📈 Memory: {c.memory}</p>
              <p>🌐 Net I/O: {c.net}</p>
              <p>🔌 Ports: {c.ports}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
