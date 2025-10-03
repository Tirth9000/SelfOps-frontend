// src/components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
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
  const [history, setHistory] = useState({}); 
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([
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
      bgColor: "bg-blue-50",
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
      bgColor: "bg-red-50",
    },
    {
      name: "db-container",
      id: "9i0j1k2l",
      status: "running",
      health: "healthy",
      image: "postgres:15",
      uptime: "3h 50m",
      restarts: 0,
      cpu: "8%",
      memory: "512MB / 2GB",
      net: "10MB / 5MB",
      ports: "5432→5432",
      bgColor: "bg-green-50",
    },
  ]);

  // WebSocket connection
  useEffect(() => {
    const ws = new io("http://localhost:8000", {path: "/ws"});

    ws.on("connect", () => {
      ws.emit("join", {username: "user2", room: "room1"});
      console.log("WebSocket connected");
    });

    ws.on("live_message", (data) => {
      // data is array of container stats
      setHistory((prev) => {
        const updated = { ...prev };
        console.log("Received data:", data);

        data.forEach((container) => {
          if (!updated[container.name]) {
            updated[container.name] = { cpu: [], memory: [], network: [] };
          }

          // CPU is number, Memory extract numeric value (MB)
          updated[container.name].cpu = [
            ...(updated[container.name].cpu || []),
            container.cpu,
          ].slice(-10); // keep last 6 

          const memUsed = parseFloat(container.memory); // extract "235MB"
          updated[container.name].memory = [
            ...(updated[container.name].memory || []),
            memUsed,
          ].slice(-10);

          // network placeholder (you can replace with real)
          updated[container.name].network = [
            ...(updated[container.name].network || []),
            Math.random() * 100, // fake network value
          ].slice(-10);
        });

        return updated;
      });
    });

    return () => ws.close();
  }, []);

  const labels = ["t-5m", "t-4m", "t-3m", "t-2m", "t-1m", "now"];

  const chartData = {
    labels,
    datasets: Object.keys(history).map((name, idx) => {
      const colors = ["#60a5fa", "#34d399", "#fbbf24", "#f87171", "#a78bfa"]; // few colors
      return {
        label: name,
        data: history[name][metric] || [],
        borderColor: colors[idx % colors.length],
        backgroundColor: colors[idx % colors.length] + "33",
        fill: false,
        tension: 0.3,
      };
    }),
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: "top" } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value.toFixed(2); // show 0.12 as 0.12, not 0
          }
        },
        suggestedMax: 0.5  // zoom into small values (adjust this dynamically)
      }
    },
  };

  // const maxValue = Math.max(...Object.keys(history).map((name, idx) => {
  //   return Math.max(...(history[name][metric] || [0]));
  // }));
  // const chartOptions = {
  //   responsive: true,
  //   plugins: { legend: { position: "top" } },
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //       suggestedMax: maxValue * 1.2, // keep 20% headroom
  //     }
  //   },
  // };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        📊 SelfOps - Container Dashboard
      </h1>

      {/* Top Graph */}
      <motion.div
        className="bg-white p-6 rounded-2xl shadow mb-8 w-full"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
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
            className={`${c.bgColor} rounded-2xl p-6 shadow hover:shadow-lg transition cursor-pointer`}
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelectedCard(c)}
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
              <p>🖼 {c.image}</p>
              <p>⏱ Uptime: {c.uptime}</p>
              <p>💻 CPU: {c.cpu}</p>
              <p>📈 Memory: {c.memory}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white rounded-2xl p-8 w-96 shadow-2xl"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
          >
            <h2 className="text-xl font-bold mb-4">{selectedCard.name}</h2>
            <div className="text-gray-700 space-y-2 text-sm">
              <p>
                <strong>ID:</strong> {selectedCard.id}
              </p>
              <p>
                <strong>Status:</strong> {selectedCard.status}
              </p>
              <p>
                <strong>Health:</strong> {selectedCard.health}
              </p>
              <p>
                <strong>Image:</strong> {selectedCard.image}
              </p>
              <p>
                <strong>Uptime:</strong> {selectedCard.uptime}
              </p>
              <p>
                <strong>Restarts:</strong> {selectedCard.restarts}
              </p>
              <p>
                <strong>CPU:</strong> {selectedCard.cpu}
              </p>
              <p>
                <strong>Memory:</strong> {selectedCard.memory}
              </p>
              <p>
                <strong>Net I/O:</strong> {selectedCard.net}
              </p>
              <p>
                <strong>Ports:</strong> {selectedCard.ports}
              </p>
            </div>
            <button
              className="mt-6 bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition w-full"
              onClick={() => setSelectedCard(null)}
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
