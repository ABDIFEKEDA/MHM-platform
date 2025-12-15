"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
import AdminLayout from "@/components/adminLayout";
import DashboardChart from "@/components/chart";
import DashboardChart2 from "@/components/chart2";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Mail } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean>(false);

  type Notification = {
    id?: number;
    user: string;
    type: string;
    time: string;
  };

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

 
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/notifications");
        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      router.push("/auth/login");
      return;
    }

    setAuthorized(true);

    const socket = io("http://localhost:4000", {
      transports: ["websocket"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      socket.emit("joinAdminRoom");
      console.log("Connected to socket:", socket.id);
    });

    socket.on("adminNotification", (data: Notification) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("adminNotification");
      socket.disconnect();
    };
    
  }, [router]);

  if (!authorized) {
    return <p className="text-center mt-10">Redirecting...</p>;
  }

  return (
    <AdminLayout>
      <div className="bg-gray-200 min-h-screen p-6 rounded-lg">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-[#253D90] flex items-center">
            Admin Dashboard
          </h1>

          <div className="flex items-center gap-5">
            <div className="relative">
              <Bell
                className="w-6 h-6 text-blue-700 cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-xs text-white bg-red-600 rounded-full">
                  {notifications.length}
                </span>
              )}

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-2 z-50">
                  <h3 className="text-sm font-semibold mb-2">Notifications</h3>
                  <ul>
                    {notifications.length === 0 ? (
                      <li className="text-xs text-gray-500">
                        No notifications
                      </li>
                    ) : (
                      notifications.map((n, i) => (
                        <li
                          key={n.id ?? i}
                          className="text-xs text-gray-700 border-b py-1"
                        >
                          {n.user}{" "}
                          {n.type === "register"
                            ? "registered"
                            : n.type === "login"
                            ? "logged in"
                            : n.type}{" "}
                          at {new Date(n.time).toLocaleString()}
                        </li>
                      ))
                    )}
                  </ul>
                  <button
                    onClick={() => setNotifications([])}
                    className="mt-2 text-xs text-blue-600 hover:underline"
                  >
                    Mark all as read
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <Mail className="w-6 h-6 text-green-600 cursor-pointer" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></span>
            </div>
            <Avatar>
              <AvatarImage src={"/avatar.png"} />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Total Users</h2>
            <p className="text-2xl font-bold">1200</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Active Reports</h2>
            <p className="text-2xl font-bold">24</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Notifications</h2>
            <p className="text-2xl font-bold">{notifications.length}</p>
          </div>
        </div>

        <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <DashboardChart />
          <DashboardChart2 />
        </div>
      </div>
    </AdminLayout>
  );
}
