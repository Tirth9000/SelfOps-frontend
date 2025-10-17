// src/components/HomeDashboard.jsx
import React, { useState, useRef } from "react";
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
  Tooltip as ChartTooltip,
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
  const [activePage, setActivePage] = useState("Home");
  const tooltipRefs = useRef({});

  // Tooltip smart positioning
  const handleMouseEnter = (key) => {
    const tooltip = tooltipRefs.current[key];
    if (!tooltip) return;

    const rect = tooltip.getBoundingClientRect();
    const iconRect = tooltip.parentElement.getBoundingClientRect();

    // Horizontal adjustment
    const overflowRight = rect.right > window.innerWidth;
    const overflowLeft = rect.left < 0;

    if (overflowRight) {
      tooltip.style.left = "auto";
      tooltip.style.right = "0";
      tooltip.style.transform = "translateX(0)";
    } else if (overflowLeft) {
      tooltip.style.left = "0";
      tooltip.style.transform = "translateX(0)";
    } else {
      tooltip.style.left = "50%";
      tooltip.style.transform = "translateX(-50%)";
    }

    // Vertical flip if tooltip would overflow above
    const tooltipHeight = rect.height;
    if (iconRect.top - tooltipHeight - 8 < 0) {
      tooltip.style.bottom = "auto";
      tooltip.style.top = "100%";
      tooltip.style.marginTop = "8px";
    } else {
      tooltip.style.top = "auto";
      tooltip.style.bottom = "100%";
      tooltip.style.marginBottom = "8px";
    }
  };

  const handleMouseLeave = (key) => {
    const tooltip = tooltipRefs.current[key];
    if (!tooltip) return;
    tooltip.style.left = "50%";
    tooltip.style.transform = "translateX(-50%)";
    tooltip.style.top = "auto";
    tooltip.style.bottom = "100%";
    tooltip.style.marginBottom = "8px";
    tooltip.style.marginTop = "0";
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1
            className="text-2xl font-extrabold text-gray-800 cursor-pointer flex items-center gap-2 hover:text-indigo-600 transition duration-300"
            onClick={() => {
              setActivePage("Home");
              window.location.href = "/homedashboard";
            }}
          >
            <span className="text-indigo-600 animate-pulse">📊</span>
            <span>SelfOps</span>
          </h1>

          <div className="flex items-center gap-6">
            {[
              { icon: HomeIcon, title: "Home", color: "indigo", link: "/homedashboard" },
              { icon: CubeIcon, title: "Containers", color: "green", link: "/applications" }, // Changed link
              { icon: BellIcon, title: "Alerts", color: "red", link: "#" },
              { icon: Cog6ToothIcon, title: "Settings", color: "yellow", link: "#" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
              >
                <button
                  className={`flex items-center text-gray-600 hover:text-${item.color}-600 transition duration-300 p-2 rounded-lg hover:bg-${item.color}-50 ${
                    activePage === item.title ? `text-${item.color}-600` : ""
                  }`}
                  onClick={() => {
                    if (item.link !== "#") {
                      setActivePage(item.title);
                      window.location.href = item.link;
                    }
                  }}
                >
                  <item.icon className="h-6 w-6" />
                </button>

                {/* Tooltip */}
                <span
                  ref={(el) => (tooltipRefs.current[idx] = el)}
                  className="absolute z-50 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out whitespace-nowrap max-w-[150px] overflow-hidden text-ellipsis pointer-events-none"
                  style={{
                    left: "50%",
                    transform: "translateX(-50%)",
                    bottom: "100%",
                    marginBottom: "8px",
                  }}
                  title={item.title}
                >
                  {item.title}
                </span>

                {/* Active underline */}
                {activePage === item.title && (
                  <span
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-${item.color}-600 rounded-full`}
                  ></span>
                )}
              </div>
            ))}

            <button
              className="px-4 py-2 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 transition transform hover:scale-105 shadow-md"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Welcome Section */}
        <section className="px-6 py-12 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-3 animate-slide-down">Welcome back 👋</h2>
          <p className="text-gray-600 text-lg">Here’s a quick overview of your containers, resources, and system health.</p>
        </section>

        {/* Quick Stats */}
        <section className="px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[ 
            { icon: CpuChipIcon, title: "CPU Usage", value: "65%", color: "gray-800" },
            { icon: CloudIcon, title: "Active Containers", value: "12", color: "blue-600" },
            { icon: ShieldCheckIcon, title: "System Health", value: "Healthy", color: "green-600" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-2 duration-300 cursor-pointer"
            >
              <stat.icon className={`h-10 w-10 text-${stat.color} mb-3`} />
              <h3 className="text-lg font-semibold">{stat.title}</h3>
              <p className={`text-gray-600`}>
                {stat.title === "System Health" ? "Status:" : "Current:"}{" "}
                <span className={`font-bold text-${stat.color}`}>{stat.value}</span>
              </p>
            </div>
          ))}
        </section>

        {/* Charts Section */}
        <section className="px-6 py-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* CPU Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:scale-[1.02] duration-300">
            <h3 className="text-lg font-semibold mb-4">CPU Usage Over Time</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={cpuData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <ChartTooltip />
                <Line type="monotone" dataKey="usage" stroke="#374151" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Memory Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:scale-[1.02] duration-300">
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
                <ChartTooltip />
                <Area type="monotone" dataKey="usage" stroke="#1f2937" fillOpacity={1} fill="url(#colorMem)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Deployment Section */}
        <section className="px-6 py-16 max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-10 rounded-3xl shadow-md hover:shadow-lg transition-transform transform hover:scale-[1.02] duration-300">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold mb-3">Deploy Your Application</h3>
                <p className="text-gray-300 max-w-lg">
                  Quickly deploy new containers and manage them from one place. Scale up or down in seconds.
                </p>
              </div>
              <button className="mt-6 md:mt-0 px-6 py-3 bg-white text-gray-800 font-semibold rounded-xl hover:bg-gray-200 transition transform hover:scale-105 duration-300 flex items-center gap-2">
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
            {[
              { name: "api-service", status: "Deployed successfully", time: "2 hours ago" },
              { name: "auth-service", status: "Restarted due to update", time: "5 hours ago" },
              { name: "frontend-app", status: "Scaled to 3 instances", time: "Yesterday" },
            ].map((act, idx) => (
              <li
                key={idx}
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 duration-300"
              >
                <p className="text-gray-800 font-semibold">Container "{act.name}"</p>
                <p className="text-gray-500 text-sm">{act.status} · {act.time}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Footer */}
        <footer className="bg-white shadow-md py-6 mt-12 text-center text-gray-500">
          © 2025 SelfOps. All rights reserved.
        </footer>
      </main>
    </div>
  );
};

export default HomeDashboard;
