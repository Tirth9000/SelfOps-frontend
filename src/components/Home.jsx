// src/components/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CpuChipIcon, ShieldCheckIcon, RocketLaunchIcon, ServerStackIcon, ArrowsRightLeftIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

const Home = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.2 } }),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-4 flex justify-between items-center">
          <img className="w-40" src="/src/assets/logo-black.png" alt="" />
          <nav className="space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 text-gray-800 font-semibold hover:bg-gray-100 rounded transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700 transition"
            >
              Signup
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-24 px-6 bg-gradient-to-r from-gray-50 via-white to-gray-50">
        <motion.h2
          className="text-5xl md:text-6xl font-bold mb-6 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Simplify Container Management
        </motion.h2>
        <motion.p
          className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Monitor metrics, track uptime, and manage containers efficiently — all from a sleek dashboard.
        </motion.p>
        <motion.div
          className="flex justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Link
            to="/signup"
            className="px-8 py-4 bg-gray-800 text-white rounded-xl font-semibold shadow hover:bg-gray-700 hover:scale-105 transform transition"
          >
            Get Started
          </Link>
          <Link
            to="/dashboard"
            className="px-8 py-4 border border-gray-800 text-gray-800 rounded-xl font-semibold shadow hover:bg-gray-100 hover:scale-105 transform transition"
          >
            View Dashboard
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Features of SelfOps</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: CpuChipIcon,
              title: "Real-Time Monitoring",
              desc: "Track CPU, memory, and network usage for all containers in real time with detailed graphs.",
            },
            {
              icon: ShieldCheckIcon,
              title: "Health & Uptime",
              desc: "Ensure the health of each container and maintain high availability for all your applications.",
            },
            {
              icon: RocketLaunchIcon,
              title: "Quick Deployment",
              desc: "Deploy new apps and containers quickly and manage them from a single intuitive interface.",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={idx}
            >
              <feature.icon className="h-12 w-12 text-gray-800 mb-4 mx-auto" />
              <h4 className="text-xl font-semibold mb-3 text-center">{feature.title}</h4>
              <p className="text-gray-600 text-center">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Functionalities Section */}
      <section className="py-20 px-6 bg-gray-100">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Core Functionalities</h3>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            {
              icon: ServerStackIcon,
              title: "Container Management",
              desc: "Easily create, start, stop, and monitor your containers.",
            },
            {
              icon: CpuChipIcon,
              title: "Performance Metrics",
              desc: "View CPU, memory, and network usage in real-time dashboards.",
            },
            {
              icon: ArrowsRightLeftIcon,
              title: "Network Insights",
              desc: "Monitor container network I/O and detect anomalies easily.",
            },
          ].map((func, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={idx + 3}
            >
              <func.icon className="h-12 w-12 text-gray-800 mb-4 mx-auto" />
              <h4 className="text-xl font-semibold mb-2 text-gray-800">{func.title}</h4>
              <p className="text-gray-600">{func.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">How SelfOps Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            {
              icon: Cog6ToothIcon,
              title: "Connect Your Containers",
              desc: "Add your apps and containers to SelfOps in a few simple steps.",
            },
            {
              icon: CpuChipIcon,
              title: "Monitor & Analyze",
              desc: "Keep track of metrics like CPU, memory, and network in real time.",
            },
            {
              icon: RocketLaunchIcon,
              title: "Optimize & Deploy",
              desc: "Take actions on containers, deploy updates, and ensure smooth operations.",
            },
          ].map((step, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition transform hover:-translate-y-2"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={idx + 6}
            >
              <step.icon className="h-12 w-12 text-gray-800 mb-4 mx-auto" />
              <h4 className="text-xl font-semibold mb-2 text-gray-800">{step.title}</h4>
              <p className="text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white shadow-md py-6 mt-12 text-center text-gray-500">
        © 2025 SelfOps. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
