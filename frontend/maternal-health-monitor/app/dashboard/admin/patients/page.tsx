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

const patientsData = [
  {
    name: "Amina Hassan",
    age: 26,
    phone: "0912345678",
    week: 24,
    risk: "Low",
    doctor: "Dr. Abdi",
    status: "Active",
  },
  {
    name: "Sara Mohammed",
    age: 30,
    phone: "0987654321",
    week: 32,
    risk: "High",
    doctor: "Dr. Milkesa",
    status: "Active",
  },
  {
    name: "Hanna Tesfaye",
    age: 22,
    phone: "0976543210",
    week: 18,
    risk: "Medium",
    doctor: "Dr. Hana",
    status: "Inactive",
  },
  {
    name: "Rahel Alemu",
    age: 28,
    phone: "0900112233",
    week: 36,
    risk: "High",
    doctor: "Dr. Elias",
    status: "Active",
  },
  {
    name: "Rahel Alemu",
    age: 28,
    phone: "0900112233",
    week: 36,
    risk: "High",
    doctor: "Dr. Elias",
    status: "Active",
  },
  {
    name: "Rahel Alemu",
    age: 28,
    phone: "0900112233",
    week: 36,
    risk: "High",
    doctor: "Dr. Elias",
    status: "Active",
  },
  {
    name: "Rahel Alemu",
    age: 28,
    phone: "0900112233",
    week: 36,
    risk: "High",
    doctor: "Dr. Elias",
    status: "Active",
  },
  {
    name: "Rahel Alemu",
    age: 28,
    phone: "0900112233",
    week: 36,
    risk: "High",
    doctor: "Dr. Elias",
    status: "Active",
  },
];

const ITEMS_PER_PAGE = 6;

export default function PatientsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(patientsData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPatients = patientsData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <AdminLayout>
      <div className="p-6 bg-[#e9effb] min-h-screen">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-[#253D90] flex items-center ">
            List of All Patients
          </h1>

          <div className="flex items-center gap-5">
            <div className="relative">
              <Bell className="w-6 h-6 text-blue-700 cursor-pointer" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></span>
            </div>
            <div className="relative">
              <Mail className="w-6 h-6 text-green-600 cursor-pointer" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"></span>
            </div>
            <Avatar>
              <AvatarImage src={'/avatar.png'} />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="flex justify-end mb-4">
          <Button className="bg-[#0F2B8F] hover:bg-blue-800">
            Add Patients
          </Button>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-50">
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Pregnancy Week</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Assigned Doctor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentPatients.map((patient, index) => (
                <TableRow key={index}>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>{patient.week} weeks</TableCell>

                  <TableCell
                    className={`font-semibold ${
                      patient.risk === "Low"
                        ? "text-green-600"
                        : patient.risk === "Medium"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {patient.risk}
                  </TableCell>

                  <TableCell>{patient.doctor}</TableCell>

                  <TableCell
                    className={`font-semibold ${
                      patient.status === "Active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {patient.status}
                  </TableCell>

                  <TableCell className="flex gap-2 justify-center">
                    <Button
                      size="sm"
                      className="bg-yellow-600 hover:bg-green-700"
                    >
                      Edit
                    </Button>

                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      Delete
                    </Button>

                    <Button size="sm" className="bg-yellow-600 hover:bg-blue-700">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-end items-center gap-4 mt-6">
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
