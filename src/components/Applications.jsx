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

  const handleRegisterApp = () => {
    const newApp = {
      id: `app${applications.length + 1}`,
      name: `New App ${applications.length + 1}`,
      status: "running",
      containers: 2,
      url: `https://selfops.app/new-app-${applications.length + 1}`,
    };
    setApplications([...applications, newApp]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        📦 Registered Applications
      </h1>

      {/* Register Button */}
      <div className="mb-6">
        <button
          onClick={handleRegisterApp}
          className="px-6 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 transition shadow"
        >
          + Register New Application
        </button>
      </div>

      {/* Applications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {app.name}
              </h2>
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

            <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Manage Containers
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Applications;
