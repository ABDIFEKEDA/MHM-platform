"use client";


import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  HomeIcon,
  UsersIcon,
  CalendarIcon, 
  Cog6ToothIcon,
  ChevronDownIcon,
  ChevronUpIcon,
 
} from "@heroicons/react/24/outline";

export default function DoctorSideBar() {
  const pathname = usePathname(); 
  const [openReports, setOpenReports] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const menuItemClass = (path: string) =>
    `flex items-center gap-3 px-3 py-2 rounded w-full justify-start ${
      pathname === path ? "bg-gray-200" : "hover:bg-gray-200"
    }`;

  return (
    <div
      className={`h-screen bg-[#ffffff] text-[#0F2B8F] flex flex-col shadow-md ${
        collapsed ? "w-20" : "w-64"
      } transition-width duration-300`}
    >
      
      <div className="text-2xl font-bold text-center py-6 border-b border-gray-700 flex justify-between items-center px-3">
        {!collapsed && <span>Doctors Dashboard</span>}
        <button
          className="p-1 hover:bg-gray-200 rounded"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronDownIcon className="w-6 h-6" /> : <ChevronUpIcon className="w-6 h-6" />}
        </button>
      </div>
      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="flex flex-col gap-2">
          <Link href="/dashboard/doctors" className={menuItemClass("dashboard/doctors")}>
            <HomeIcon className="w-6 h-6" />
            {!collapsed && "Dashboard"}
          </Link>
          <Link href="/dashboard/doctors/Alerts" className={menuItemClass("/dashboard/doctors/Alerts")}>
            <UsersIcon className="w-6 h-6" />
            {!collapsed && "Alerts"}
          </Link>
          <Link href="/dashboard/doctors/appointments" className={menuItemClass("/dashboard/doctors/appointments")}>
            <UsersIcon className="w-6 h-6" />
            {!collapsed && "Appointments"}
          </Link>
          <Link href="/dashboard/doctors/messages" className={menuItemClass("/dashboard/doctors/messages")}>
            <CalendarIcon className="w-6 h-6" />
            {!collapsed && "Messages"}
          </Link>
          <Link href="/dashboard/doctors/notifications" className={menuItemClass("/dashboard/doctors/notifications")}>
            <CalendarIcon className="w-6 h-6" />
            {!collapsed && "notification"}
          </Link>

         
          <div className="flex flex-col">
            <button
              className={`flex items-center justify-between px-3 py-2 w-full rounded hover:bg-gray-200 ${
                openReports ? "bg-gray-2oo" : ""
              }`}
              onClick={() => setOpenReports(!openReports)}
            >
              <div className="flex items-center gap-3">
               
                {!collapsed && "Reports"}
              </div>
              {!collapsed && (
                <span>{openReports ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}</span>
              )}
            </button>
            {openReports && !collapsed && (
              <div className="flex flex-col ml-10 mt-1 gap-1">
                <Link href="/dashboard/admin/reports/monthly" className={menuItemClass("/admin/reports/monthly")}>
                  Monthly
                </Link>
                <Link href="/dashboard/admin/reports/yearly" className={menuItemClass("/admin/reports/yearly")}>
                  Yearly
                </Link>
              </div>
            )}
          </div>

          <Link href="/dashboard/doctors/settings" className={menuItemClass("/doctors/setting")}>
            <Cog6ToothIcon className="w-6 h-6" />
            {!collapsed && "Settings"}
          </Link>
        </nav>
      </ScrollArea>

      {/* Logout */}
      <div className="px-2 py-4 border-t border-gray-700">
        <Link href="/">
        <Button variant="ghost" className="w-full justify-center gap-3 bg-red-600 text-white hover:bg-red-700">

          {!collapsed && "Logout"}
        </Button>
        </Link>
      </div>
    </div>
  );
}
