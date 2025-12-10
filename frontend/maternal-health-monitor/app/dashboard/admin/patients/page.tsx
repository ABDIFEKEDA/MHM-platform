"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/adminLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bell, Mail } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import RecentActivityFilters from "@/components/fiter"; // ✅ single correct import
import Patient from "../../../type/patients";

const ITEMS_PER_PAGE = 8;

export default function PatientsPage() {
  const [patientsData, setPatientsData] = useState<Patient[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | undefined>();
  const [filterType, setFilterType] = useState("name");

  useEffect(() => {
    async function fetchPatients() {
      try {
        const res = await fetch("http://localhost:4000/api/patients");
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        const data: Patient[] = await res.json();
        setPatientsData(data);
      } catch (err) {
        console.error("Error fetching patients:", err);
      }
    }
    fetchPatients();
  }, []);

  const filteredPatients = patientsData.filter((patient) => {
    if (filterStatus && patient.status !== filterStatus) return false;

    if (searchTerm) {
      const value =
        filterType === "email"
          ? patient.email
          : filterType === "phone"
          ? patient.phone
          : patient.name;
      return value.toLowerCase().includes(searchTerm.toLowerCase());
    }

    return true;
  });

  const totalPages = Math.ceil(filteredPatients.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPatients = filteredPatients.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

 
  const handleEdit = (id: number) => console.log("Edit patient:", id);
  const handleDelete = async (id: number) => console.log("Delete patient:", id);
  const handleViewDetails = (id: number) =>
    console.log("View details for patient:", id);

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="p-6 bg-gray-200 min-h-screen shadow-lg">
         
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-[#253D90] flex items-center gap-2">
              Patient Management
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
                <AvatarImage src={"/avatar.png"} />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="mb-4">
            <RecentActivityFilters
              onSearchChange={(val) => setSearchTerm(val)}
              onStatusChange={(val) => setFilterStatus(val)}
              onTypeChange={(val) => setFilterType(val)}
            />
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Pregnancy Stage</TableHead>
                  <TableHead>Medical History</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.id}</TableCell>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.email}</TableCell>
                    <TableCell>{patient.phone}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.pregnancy_stage}</TableCell>
                    <TableCell>{patient.medical_history}</TableCell>
                    <TableCell className="flex gap-2 justify-center">
                      <Button
                        size="sm"
                        className="bg-yellow-600 hover:bg-yellow-700"
                        onClick={() => handleEdit(patient.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => handleDelete(patient.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleViewDetails(patient.id)}
                      >
                        View Details
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
      </div>
    </AdminLayout>
  );
}
