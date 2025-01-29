import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { HomeIcon, ChartBarIcon, CogIcon, UsersIcon, BellIcon, LogoutIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

export default function Nav() {
  const [active, setActive] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`bg-grayish text-white flex flex-col p-4 relative transition-all duration-500 ease-in-out ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Toggle Button */}
        <button
          className="absolute mt-7 top-9 -right-3 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300 ease-in-out shadow-lg"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRightIcon className="w-5 h-5" />
          ) : (
            <ChevronLeftIcon className="w-5 h-5" />
          )}
        </button>

        {/* Logo */}
        <div
          className={`flex items-center justify-center mb-10 mt-5 transition-all duration-500 ease-in-out ${
            collapsed ? "opacity-100" : "opacity-100"
          }`}
        >
          <img
            src="/images/tupseal.png"
            alt="Tupseal"
            className={`transition-all duration-500 ease-in-out ${
              collapsed ? "w-12 h-12" : "w-32 h-32"
            }`}
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2">
          {[
            { name: "Dashboard", icon: HomeIcon, path: "/dashboard" },
            { name: "Usage Monitor", icon: ChartBarIcon, path: "/usage-monitor" },
            { name: "Janitors", icon: UsersIcon, path: "/janitors" },
            { name: "Resources", icon: CogIcon, path: "/resources" },
            { name: "Settings", icon: CogIcon, path: "/settings" },
            { name: "Users", icon: UsersIcon, path: "/users" },
          ].map((item) => (
            <Link
              to={item.path}
              key={item.name}
              className={`flex items-center p-3 rounded-lg transition-all duration-300 ease-in-out ${
                active === item.name ? "bg-gray-1 text-grayish" : "hover:bg-gray-1-500"
              } ${collapsed ? "justify-center" : ""} hover:scale-105`}
              onClick={() => setActive(item.name)}
            >
              <item.icon className="w-6 h-6 flex-shrink-0 block scale-100" />
              <span
                className={`transition-all duration-300 ease-in-out ${
                  collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto ml-3"
                }`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>


        {/* Logout */}
        <button
          className="mt-auto flex items-center p-3 rounded-lg hover:bg-red-700 transition-all duration-500 ease-in-out transform hover:scale-105"
          onClick={() => console.log("Logout clicked")} 
        >
          <LogoutIcon className={`w-6 h-6 transition-all duration-500 ease-in-out ${collapsed ? "mx-auto" : "mr-3"}`} />
          <span
            className={`transition-all duration-500 ease-in-out ${
              collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
            }`}
          >
            Log Out
          </span>
        </button>

      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-fafbfe shadow-md p-6 flex justify-between items-center transition-shadow duration-300 ease-in-out">
          <h1 className="text-lg font-semibold"></h1>
          <div className="flex items-center space-x-4">
            <BellIcon className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors duration-300 hover:scale-110" />
            <div className="flex items-center">
              <img
                className="w-8 h-8 rounded-full border transition-transform duration-300 hover:scale-110"
                src=""
                alt="User"
              />
              <span className="ml-2 mr-4 font-medium">@juandelacruz</span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6 bg-gray-100 flex-1">
          <Outlet /> {}
        </main>
      </div>
    </div>
  );
}
