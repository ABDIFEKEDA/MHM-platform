"use client";
import AdminLayout from "@/components/adminLayout";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bell, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";

const doctorsData = [
  {
    name: "Dr. Abdi",
    specialization: "Mental Specialist",
    faculty: "Psychiatrists",
    status: "Active",
  },
  {
    name: "Dr. Milkesa",
    specialization: "Midwife",
    faculty: "Nursing Dept",
    status: "Active",
  },
  {
    name: "Dr. Hana",
    specialization: "OB/GYN",
    faculty: "Maternity",
    status: "Inactive",
  },
  {
    name: "Dr. Elias",
    specialization: "General Doctor",
    faculty: "Emergency",
    status: "Active",
  },
  {
    name: "Dr. Elias",
    specialization: "General Doctor",
    faculty: "Emergency",
    status: "Active",
  },
  {
    name: "Dr. Elias",
    specialization: "General Doctor",
    faculty: "Emergency",
    status: "Active",
  },
  {
    name: "Dr. Elias",
    specialization: "General Doctor",
    faculty: "Emergency",
    status: "Active",
  },
  {
    name: "Dr. Elias",
    specialization: "General Doctor",
    faculty: "Emergency",
    status: "Active",
  },
];

const ITEMS_PER_PAGE = 6;

export default function DoctorsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(doctorsData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentDoctors = doctorsData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <AdminLayout>
      <div className="p-6 bg-[#e9effb] min-h-screen">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-[#253D90] flex items-center gap-2">
            List Of All Doctors
          </h1>

          <div className="flex items-center gap-5">
            {/* Notification */}
            <div className="relative">
              <Bell className="w-6 h-6 text-blue-700 cursor-pointer" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></span>
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

        <div className="flex justify-end mb-4">
          <Button className="bg-yellow-700 hover:bg-yellow-400">
            Add Doctors
          </Button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-50">
                <TableHead>Name</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Assigned Faculty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentDoctors.map((doctor, index) => (
                <TableRow key={index}>
                  <TableCell>{doctor.name}</TableCell>
                  <TableCell>{doctor.specialization}</TableCell>
                  <TableCell>{doctor.faculty}</TableCell>

                  <TableCell
                    className={`font-semibold ${
                      doctor.status === "Active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {doctor.status}
                  </TableCell>

                  <TableCell className="flex gap-2 justify-center">
                    <Button
                      size="sm"
                      className="bg-yellow-600 hover:bg-yellow-700 cursor-pointer text[#253D90]"
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 cursor-pointer"
                    >
                      Delete
                    </Button>

                    <Button
                      size="sm"
                      className="bg-yellow-600 hover:bg-yellow-700 cursor-pointer"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-center items-center gap-4 mt-6">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Previous
            </Button>

            <span className="font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
     
    </AdminLayout>
  );
}
