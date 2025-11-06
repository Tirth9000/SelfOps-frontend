// src/components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ClipboardIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { io } from "socket.io-client";
import API from "../components/axiosInstance.js";
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
  const [sharePopup, setSharePopup] = useState(false);
  const [containers, setContainers] = useState([]);
  const [shareToken, setShareToken] = useState("");

  const { id } = useParams();
  const { type } = useParams();

// websocket connection
  useEffect(() => {
    const ws = new io("http://localhost:8000", { path: "/ws" });

    ws.on("connect", () => {
      ws.emit("join", { room: "web-" + id });
      console.log(id);
      console.log("WebSocket connected");
    });

    ws.on("live_message", (data) => {
      console.log(data);
      setHistory((prev) => {
        const updated = { ...prev };
        data.forEach((container) => {
          if (!updated[container.name]) {
            updated[container.name] = { cpu: [], memory: [], network: [] };
          }

          updated[container.name].cpu = [
            ...(updated[container.name].cpu || []),
            container.cpu,
          ].slice(-10);

          const memUsed = parseFloat(container.memory);
          updated[container.name].memory = [
            ...(updated[container.name].memory || []),
            memUsed,
          ].slice(-10);

          updated[container.name].network = [
            ...(updated[container.name].network || []),
            Math.random() * 100,
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
      const colors = ["#60a5fa", "#34d399", "#fbbf24", "#f87171", "#a78bfa"];
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
          callback: function (value) {
            return value.toFixed(2);
          },
        },
        suggestedMax: 0.5,
      },
    },
  };

  useEffect(() => {
    const fetchAppsContainers = async () => {
      try {
        const token = localStorage.getItem("token");

        const app_containers = await API.get(
          `/web/app/containers/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(app_containers.data);

        setContainers(app_containers.data.app_containers);
        // const formatted = app_containers.data.app_containers.map((container, index) => ({
        //   id: container._id,
        //   name: container.container_name,
        //   image: container.image,
        //   status: container.status,
        //   uptime: container.uptime,
        //   cpu_percent: container.cpu_percent,
        //   memory: container.memory_usage,
        //   memory_limit: container.memory_limit,
        // }));

        // console.log(formatted)
        // setContainers(formatted);
      } catch (err) {
        console.error("Error fetching applications:", err);
      }
    };

    fetchAppsContainers();
  }, []);

  useEffect(() => {
    const fetchShareToken = async () => {
      try {
        const token = localStorage.getItem("token");
        const savedShareToken = localStorage.getItem("shareToken");
        const savedTimestamp = localStorage.getItem("shareTokenTimestamp");
        const savedAppId = localStorage.getItem("appId");

        const now = Date.now();
        const expiryTime = 24 * 60 * 60 * 1000; // 24 hours in ms

        // ✅ If token exists and not expired, reuse it
        if (
          savedShareToken &&
          savedTimestamp &&
          now - savedTimestamp < expiryTime
        ) {
          setShareToken(savedShareToken);
          return;
        }

        // ✅ Otherwise, fetch a new one
        if (sharePopup && shareToken === "" && savedAppId !== id) {
          const response = await API.post(
            "/web/sharelink/create",
            { app_id: id },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const app_id = id;
          const newToken = response.data.share_token;

          // Save new token and timestamp
          localStorage.setItem("appId", app_id);
          localStorage.setItem("shareToken", newToken);
          localStorage.setItem("shareTokenTimestamp", now.toString());

          setShareToken(newToken);
        }
      } catch (error) {
        console.error("Error fetching share token:", error);
      }
    };

    fetchShareToken();
  }, [sharePopup]);

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fake Navbar like Applications page */}
      <div className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-6 px-0">
          <h1 className="text-3xl flex justify-center items-center font-extrabold text-blue-800">
            <img className="w-40 mr-10" src="/src/assets/logo-black.png" alt="" /> Dashboard
          </h1>
          {type === "owned" ?  
          <button
            onClick={() => setSharePopup(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition shadow"
          >
            Share App
          </button>
          : null }
        </div>
        <div className="border-b border-gray-200"></div>
      </div>

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
        <div style={{ width: "80%" }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </motion.div>

      {/* Container Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {containers.map((container, index) => (
          <motion.div
            key={container.container_id}
            className={`blue rounded-2xl p-6 shadow hover:shadow-lg transition cursor-pointer`}
            whileHover={{ scale: 1.03 }}
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {container.container_name}
                </h3>
                <p className="text-gray-500 text-sm">
                  ID: {container.container_id}
                </p>
              </div>
              <div className="flex gap-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    container.status === "running"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  ● {container.status}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    container.health === "healthy"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {container.health === "healthy" ? "✓ Healthy" : "✕ Unhealthy"}
                </span>
              </div>
            </div>
            {/* <div className="text-sm text-gray-700 space-y-1">
              <p>🖼 {c.image}</p>
              <p>⏱ Uptime: {c.uptime}</p>
              <p>💻 CPU: {c.cpu}</p>
              <p>📈 Memory: {c.memory}</p>
            </div> */}
          </motion.div>
        ))}
      </div>

      {/* Container Popup */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white rounded-2xl p-8 w-full max-w-6xl h-[90vh] overflow-y-auto shadow-2xl"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
          >
            {/* Chart in Popup */}
            <div style={{ height: "400px", marginBottom: "2rem" }}>
              <Line
                data={{
                  labels,
                  datasets: [
                    {
                      label: selectedCard.name,
                      data: history[selectedCard.name]?.[metric] || [],
                      borderColor: "#60a5fa",
                      backgroundColor: "#60a5fa33",
                      fill: false,
                      tension: 0.3,
                    },
                  ],
                }}
                options={chartOptions}
              />
            </div>

            {/* Split Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-sm">
              <div className="space-y-2">
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
              </div>
              <div className="space-y-2">
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

      {/* Share App Popup */}
      {sharePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex text-center items-center justify-center z-50">
          <motion.div
            className="bg-white rounded-2xl p-6 w-96 shadow-2xl"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
          >
            <h2 className="text-3xl font-bold mb-4 ">Share App</h2>
            <div className="text-gray-700 text-sm space-y-4">
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-gray-50">
                <input
                  type="text"
                  value={shareToken}
                  readOnly
                  className="flex-grow px-4 py-2 text-gray-700 bg-transparent focus:outline-none"
                />
                <button
                  onClick={handleCopy}
                  className="flex items-center justify-center px-3 py-2 bg-gray-800 text-white hover:bg-gray-700 transition"
                >
                  {copied ? (
                    <CheckCircleIcon className="w-5 h-5 text-green-400" />
                  ) : (
                    <ClipboardIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div>
                <p className="font-semibold">
                  Share this token to share your application monitoring.
                </p>
                <small className="font-semibold text-gray-800">
                  will expire in 24 hours
                </small>
              </div>
            </div>
            <button
              className="mt-6 bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition w-full"
              onClick={() => setSharePopup(false)}
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
