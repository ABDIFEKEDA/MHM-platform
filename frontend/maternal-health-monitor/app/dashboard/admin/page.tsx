"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/adminLayout";
import DashboardChart from "@/components/chart";
import DashboardChart2 from "@/components/chart2";
import { Card } from "../../../components/ui/card";

export default function AdminDashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    
    if (!token || role !== "admin") {
      router.push("/auth/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) {
    
    return <p className="text-center mt-10">Redirecting...</p>;
  }

  return (
    <AdminLayout>
      <div className="bg-gray-200 min-h-screen p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-[#0F2B8F]">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
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
            <p className="text-2xl font-bold">8</p>
          </div>
        </div>

        <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-4 flex justify-between">
          <DashboardChart />
          <DashboardChart2 />
        </div>
      </div>
    </AdminLayout>
    
  );
}
