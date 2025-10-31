// src/components/HomeDashboard.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Share2, Crown } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../components/axiosInstance.js";
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
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip as ChartTooltip,
//   ResponsiveContainer,
//   AreaChart,
//   Area,
// } from "recharts";

// const cpuData = [
//   { time: "10 AM", usage: 45 },
//   { time: "11 AM", usage: 55 },
//   { time: "12 PM", usage: 70 },
//   { time: "1 PM", usage: 65 },
//   { time: "2 PM", usage: 60 },
// ];

// const memoryData = [
//   { time: "10 AM", usage: 30 },
//   { time: "11 AM", usage: 40 },
//   { time: "12 PM", usage: 50 },
//   { time: "1 PM", usage: 48 },
//   { time: "2 PM", usage: 55 },
// ];

const HomeDashboard = () => {
  const [activePage, setActivePage] = useState("Home");
  const tooltipRefs = useRef({});

  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();


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


  // Fetch data from FastAPI
  useEffect(() => {
    const fetchApps = async () => {
      try {
        const token = localStorage.getItem("token");

        const shared_app_response = await API.get("/web/shared-apps",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); // 👈 your FastAPI endpoint

        const my_app_response = await API.get("/web/my-apps",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const shared_app_formatted = (
          shared_app_response?.data?.apps || []
        ).map((app) => ({
          id: app._id,
          name: app.app_name,
          logo: "https://cdn-icons-png.flaticon.com/512/1828/1828673.png",
          type: "shared",
        }));

        const my_app_formatted = (my_app_response?.data?.apps || []).map(
          (app) => ({
            id: app._id,
            name: app.app_name,
            logo: "https://cdn-icons-png.flaticon.com/512/1828/1828673.png",
            type: "owned",
          })
        );
        console.log(shared_app_formatted)

        const formatted = [...my_app_formatted, ...shared_app_formatted];

        setApplications(formatted);
      } catch (err) {
        console.error("Error fetching applications:", err);
      }
    };

    fetchApps();
  }, []);


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
              {
                icon: HomeIcon,
                title: "Home",
                color: "indigo",
                link: "/homedashboard",
              },
              { icon: BellIcon, title: "Alerts", color: "red", link: "#" },
              {
                icon: Cog6ToothIcon,
                title: "Settings",
                color: "yellow",
                link: "#",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
              >
                <button
                  className={`flex items-center text-gray-600 hover:text-${
                    item.color
                  }-600 transition duration-300 p-2 rounded-lg hover:bg-${
                    item.color
                  }-50 ${
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
          <h2 className="text-3xl font-bold text-gray-800 mb-3 animate-slide-down">
            Welcome to your Applications
          </h2>
          {/* <p className="text-gray-600 text-lg">Here’s a quick overview of your containers, resources, and system health.</p> */}
        </section>

        <section className="p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Your Applications
          </h2>

          {applications.length === 0 ? (
            <p className="text-gray-500">Loading your applications...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {applications.map((app, index) => (
                <motion.div
                  key={app.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/dashboard/${app.id}`)}
                  className="relative bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  {/* Status Icon */}
                  <div className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm">
                    {app.type === "shared" ? (
                      <Share2 size={18} className="text-blue-600" />
                    ) : (
                      <Crown size={18} className="text-yellow-500" />
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col justify-between h-44 p-5">
                    {/* Logo Section */}
                    <div className="flex-grow flex items-center justify-center">
                      <img
                        src={app.logo}
                        alt={`${app.name} logo`}
                        className="w-16 h-16 object-contain rounded-xl shadow-inner bg-white p-2"
                      />
                    </div>

                    {/* Name Section */}
                    <div className="text-center mt-3">
                      <p className="font-medium text-gray-800 text-lg">
                        {app.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {app.type === "shared"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomeDashboard;
