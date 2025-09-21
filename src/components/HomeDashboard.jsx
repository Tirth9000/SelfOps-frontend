// src/components/HomeDashboard.jsx
import React, { useState } from "react";
import {
  CpuChipIcon,
  CloudIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  HomeIcon,
  CubeIcon,
  BellIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const cpuData = [
  { time: "10 AM", usage: 45 },
  { time: "11 AM", usage: 55 },
  { time: "12 PM", usage: 70 },
  { time: "1 PM", usage: 65 },
  { time: "2 PM", usage: 60 },
];

const memoryData = [
  { time: "10 AM", usage: 30 },
  { time: "11 AM", usage: 40 },
  { time: "12 PM", usage: 50 },
  { time: "1 PM", usage: 48 },
  { time: "2 PM", usage: 55 },
];

const HomeDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { name: "Home", icon: HomeIcon },
    { name: "Containers", icon: CubeIcon },
    { name: "Alerts", icon: BellIcon },
    { name: "Settings", icon: Cog6ToothIcon },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gray-800 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4">
          {sidebarOpen && <h1 className="text-xl font-bold">SelfOps</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        <nav className="flex-1 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className="flex items-center w-full px-4 py-3 hover:bg-gray-700 transition"
            >
              <item.icon className="h-6 w-6" />
              {sidebarOpen && <span className="ml-3">{item.name}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">SelfOps Dashboard</h1>
            <button className="px-4 py-2 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 transition">
              Logout
            </button>
          </div>
        </header>

        {/* Existing HomeDashboard content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Welcome Section */}
          <section className="px-6 py-12 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Welcome back 👋</h2>
            <p className="text-gray-600 text-lg">
              Here’s a quick overview of your containers, resources, and system health.
            </p>
          </section>

          {/* Quick Stats */}
          <section className="px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition transform hover:-translate-y-1">
              <CpuChipIcon className="h-10 w-10 text-gray-800 mb-3" />
              <h3 className="text-lg font-semibold">CPU Usage</h3>
              <p className="text-gray-600">
                Current: <span className="font-bold text-gray-800">65%</span>
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition transform hover:-translate-y-1">
              <CloudIcon className="h-10 w-10 text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold">Active Containers</h3>
              <p className="text-gray-600">
                Running: <span className="font-bold text-gray-800">12</span>
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition transform hover:-translate-y-1">
              <ShieldCheckIcon className="h-10 w-10 text-green-600 mb-3" />
              <h3 className="text-lg font-semibold">System Health</h3>
              <p className="text-gray-600">
                Status: <span className="font-bold text-green-600">Healthy</span>
              </p>
            </div>
          </section>

          {/* Charts Section */}
          <section className="px-6 py-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* CPU Usage Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold mb-4">CPU Usage Over Time</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={cpuData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="usage" stroke="#374151" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Memory Usage Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Memory Usage Over Time</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={memoryData}>
                  <defs>
                    <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1f2937" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#1f2937" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="usage"
                    stroke="#1f2937"
                    fillOpacity={1}
                    fill="url(#colorMem)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Deployment Section */}
          <section className="px-6 py-16 max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-10 rounded-3xl shadow-lg">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-3">Deploy Your Application</h3>
                  <p className="text-gray-300 max-w-lg">
                    Quickly deploy new containers and manage them from one place. Scale up or down in seconds.
                  </p>
                </div>
                <button className="mt-6 md:mt-0 px-6 py-3 bg-white text-gray-800 font-semibold rounded-xl hover:bg-gray-200 transition flex items-center gap-2">
                  <RocketLaunchIcon className="h-5 w-5" />
                  Deploy Now
                </button>
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="px-6 py-12 max-w-7xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h3>
            <ul className="space-y-4">
              <li className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
                <p className="text-gray-800 font-semibold">Container "api-service"</p>
                <p className="text-gray-500 text-sm">Deployed successfully · 2 hours ago</p>
              </li>
              <li className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
                <p className="text-gray-800 font-semibold">Container "auth-service"</p>
                <p className="text-gray-500 text-sm">Restarted due to update · 5 hours ago</p>
              </li>
              <li className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
                <p className="text-gray-800 font-semibold">Container "frontend-app"</p>
                <p className="text-gray-500 text-sm">Scaled to 3 instances · Yesterday</p>
              </li>
            </ul>
          </section>

          {/* Footer */}
          <footer className="bg-white shadow-md py-6 mt-12 text-center text-gray-500">
            © 2025 SelfOps. All rights reserved.
          </footer>
        </main>
      </div>
    </div>
  );
};

export default HomeDashboard;
