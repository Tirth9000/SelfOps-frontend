// src/components/Applications.jsx
import React, { useState } from "react";

const Applications = () => {
  const [applications, setApplications] = useState([
    {
      id: "app1",
      name: "Nginx Server",
      status: "running",
      containers: 3,
      url: "https://selfops.app/nginx-server",
    },
    {
      id: "app2",
      name: "Redis Cache",
      status: "stopped",
      containers: 1,
      url: "https://selfops.app/redis-cache",
    },
  ]);

  const handleJoinApp = () => {
    const newApp = {
      id: `app${applications.length + 1}`,
      name: `Joined App ${applications.length + 1}`,
      status: "running",
      containers: 2,
      url: `https://selfops.app/joined-app-${applications.length + 1}`,
    };
    setApplications([...applications, newApp]);
  };

  const handleManageContainers = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar - same size as HomeDashboard */}
      <div className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-extrabold text-gray-800">📦 Registered Applications</h1>
          
          {/* Join New App Button with hover indicator and tooltip */}
          <div className="relative group">
            <button
              onClick={handleJoinApp}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition shadow"
            >
              + Join New App
            </button>
            {/* Hover underline indicator */}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
            {/* Tooltip */}
            <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Join a new application
            </span>
          </div>
        </div>
        <div className="border-b border-gray-200"></div>
      </div>

      {/* Main Content */}
      <main className="px-6 py-6 max-w-7xl mx-auto">
        {/* Applications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white p-6 rounded-2xl shadow transition-transform transform hover:-translate-y-1 hover:shadow-xl duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{app.name}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    app.status === "running"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {app.status}
                </span>
              </div>
              <p className="text-gray-600">ID: {app.id}</p>
              <p className="text-gray-600">
                Containers: <span className="font-medium">{app.containers}</span>
              </p>
              <p className="mt-2 text-blue-600 text-sm truncate">
                <a href={app.url} target="_blank" rel="noopener noreferrer">
                  {app.url}
                </a>
              </p>

              <button
                onClick={handleManageContainers}
                className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Manage Containers
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Applications;
