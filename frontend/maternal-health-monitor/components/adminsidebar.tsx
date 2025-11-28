"use client";
import Image from "next/image";

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

export default function AdminSidebar() {
  const pathname = usePathname(); 
  const [openReports, setOpenReports] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const menuItemClass = (path: string) =>
    `flex items-center gap-3 px-3 py-2 rounded w-full justify-start ${
      pathname === path ? "bg-gray-700" : "hover:bg-gray-200"
    }`;

  return (
    <div
      className={`h-screen bg-[#ffffff] text-[#0F2B8F] flex flex-col ${
        collapsed ? "w-20" : "w-64"
      } transition-width duration-300`}
    >
      {/* Logo / Brand */}
      <div className="text-2xl font-bold text-center py-6 border-b border-gray-700 flex justify-between items-center px-3">
        {!collapsed && <span>Admin Panel</span>}
        <button
          className="p-1 hover:bg-gray-200 rounded"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronDownIcon className="w-6 h-6" /> : <ChevronUpIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* User Profile */}
      {!collapsed && (
        <div className="px-4 py-4 border-b border-gray-700 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-600">
            <Image src="/abdifk.jpg" alt="profile" width={50} height={50}  className="rounded-full" />
          </div>
          <div>
            <p className="font-semibold">Abdi Fekeda</p>
            <p className="text-sm text-gray-400">Administrator</p>
          </div>
        </div>
      )}

      {/* Menu */}
      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="flex flex-col gap-2">
          <Link href="/dashboard/admin" className={menuItemClass("/admin")}>
            <HomeIcon className="w-6 h-6" />
            {!collapsed && "Dashboard"}
          </Link>
          <Link href="/dashboard/admin/patients" className={menuItemClass("/dashboard/admin/patients")}>
            <UsersIcon className="w-6 h-6" />
            {!collapsed && "patients"}
          </Link>
          <Link href="/dashboard/admin/doctors-Management" className={menuItemClass("dashboard/admin/doctors-Management")}>
            <UsersIcon className="w-6 h-6" />
            {!collapsed && "doctors-Management"}
          </Link>
          <Link href="/dashboard/admin/profile" className={menuItemClass("/dashboard/admin/profile")}>
            <UsersIcon className="w-6 h-6" />
            {!collapsed && "profile"}
          </Link>
          <Link href="/dashboard/admin/appointments" className={menuItemClass("/admin/appointments")}>
            <CalendarIcon className="w-6 h-6" />
            {!collapsed && "Appointments"}
          </Link>

          {/* Nested Reports Menu */}
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

          <Link href="/dashboard/admin/setting" className={menuItemClass("/admin/setting")}>
            <Cog6ToothIcon className="w-6 h-6" />
            {!collapsed && "Settings"}
          </Link>
        </nav>
      </ScrollArea>

      {/* Logout */}
      <div className="px-2 py-4 border-t border-gray-700">
        <Link href="/">
        <Button variant="ghost" className="w-full justify-start gap-3">

          {!collapsed && "Logout"}
        </Button>
        </Link>
      </div>
    </div>
  );
}
