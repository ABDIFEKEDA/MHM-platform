"use client";

import { useState, useEffect, useMemo } from "react";
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
import RecentActivityFilters from "@/components/fiter";
import VitalsPatientPopup from "@/components/vitalsPopUp";
import RegisterPatientPopup from "@/components/PatientRegistrationPopUp";
import PatientDetailsPopup from "@/components/PatientsDetailPopUp";
import { Card, CardContent } from "@/components/ui/card";
import Patient from "../../../type/patients";
import EditPatientPopup from "@/components/editPatientsPopUp";

const ITEMS_PER_PAGE = 10;

export default function PatientsPage() {
  const [patientsData, setPatientsData] = useState<Patient[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | undefined>();
  const [filterType, setFilterType] = useState("name");
  const [stats, setStats] = useState({ total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus, filterType]);

  useEffect(() => {
    async function fetchPatients() {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:4000/api/patients");
        if (!res.ok) {
          throw new Error(
            `Failed to fetch patients: ${res.status} ${res.statusText}`
          );
        }
        const data: Patient[] = await res.json();
        setPatientsData(data);
      } catch (err) {
        console.error("Error fetching patients:", err);
        alert("Failed to load patients. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchPatients();
  }, []);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("http://localhost:4000/api/patients/stats");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    }
    fetchStats();
  }, []);

  const filteredPatients = useMemo(() => {
    return patientsData.filter((patient) => {
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
  }, [patientsData, searchTerm, filterStatus, filterType]);

  const currentPatients = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPatients.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPatients, currentPage]);

  const totalPages = Math.ceil(filteredPatients.length / ITEMS_PER_PAGE);

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
  };

  const handleDelete = async (id: number) => {
    if (
      !confirm(
        "Are you sure you want to delete this patient? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      setIsDeleting(id);
      const res = await fetch(`http://localhost:4000/api/patients/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setPatientsData((prev) => prev.filter((patient) => patient.id !== id));

        if (editingPatient?.id === id) {
          setEditingPatient(null);
        }

        if (currentPatients.length === 1 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        }
        alert("Patient deleted successfully");
      } else {
        throw new Error(`Failed to delete: ${res.status}`);
      }
    } catch (err) {
      console.error("Error deleting patient:", err);
      alert("Failed to delete patient. Please try again.");
    } finally {
      setIsDeleting(null);
    }
  };

  const handlePatientUpdate = (updatedPatient: Patient) => {
    setPatientsData((prev) =>
      prev.map((patient) =>
        patient.id === updatedPatient.id ? updatedPatient : patient
      )
    );

    setEditingPatient(null);
  };

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

          <div className="flex justify-end gap-4 mt-4 mb-2">
            <RegisterPatientPopup />
            <VitalsPatientPopup />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="shadow-sm mb-4">
              <CardContent>
                <h1 className="text-lg font-semibold">Total Patients</h1>
                <h3 className="text-2xl font-bold">{stats.total}</h3>
              </CardContent>
            </Card>
            <Card className="shadow-sm mb-4">
              <CardContent>
                <h1 className="text-lg font-semibold">Total Doctors</h1>
                <h3 className="text-2xl font-bold">{stats.total}</h3>
              </CardContent>
            </Card>
            <Card className="shadow-sm mb-4">
              <CardContent>
                <h1 className="text-lg font-semibold">Risk Patients</h1>
                <h3 className="text-2xl font-bold">risk level</h3>
              </CardContent>
            </Card>
            <Card className="shadow-sm mb-4">
              <CardContent>
                <h1 className="text-lg font-semibold">Upcoming Appointments</h1>
                <h3 className="text-2xl font-bold">upComing Task</h3>
              </CardContent>
            </Card>
          </div>

          <div className="mb-4">
            <RecentActivityFilters
              onSearchChange={(val) => setSearchTerm(val)}
              onStatusChange={(val) => setFilterStatus(val)}
              onTypeChange={(val) => setFilterType(val)}
            />
          </div>

          {isLoading ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading patients...</p>
              </div>
            </div>
          ) : filteredPatients.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center h-64 flex flex-col justify-center items-center">
              <p className="text-gray-600 text-lg mb-2">No patients found</p>
              <p className="text-gray-500">
                {searchTerm || filterStatus
                  ? "Try adjusting your filters"
                  : "Add your first patient"}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <div className="overflow-x-auto">
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
                      <TableRow key={patient.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">
                          {patient.id}
                        </TableCell>
                        <TableCell>{patient.name}</TableCell>
                        <TableCell>{patient.email}</TableCell>
                        <TableCell>{patient.phone}</TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell>{patient.pregnancy_stage}</TableCell>
                        <TableCell className="max-w-xs truncate">
                          {patient.medical_history}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-center relative">
                            <div className="relative">
                              <Button
                                variant="outline"
                                onClick={() => handleEdit(patient)}
                                className="bg-yellow-600 hover:bg-yellow-700 text-white cursor-pointer"
                              >
                                Edit
                              </Button>

                              {editingPatient?.id === patient.id && (
                                <div className="absolute z-50 top-full left-0 mt-1">
                                  <EditPatientPopup
                                    patient={editingPatient}
                                    open={true}
                                    onOpenChange={(isOpen) => {
                                      if (!isOpen) setEditingPatient(null);
                                    }}
                                    onClose={() => setEditingPatient(null)}
                                    onPatientUpdate={handlePatientUpdate}
                                  />
                                </div>
                              )}
                            </div>

                            <Button
                              size="sm"
                              className="bg-red-600 hover:bg-red-700"
                              onClick={() => handleDelete(patient.id)}
                              disabled={isDeleting === patient.id}
                            >
                              {isDeleting === patient.id ? (
                                <span className="flex items-center gap-1">
                                  <span className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                  Deleting...
                                </span>
                              ) : (
                                "Delete"
                              )}
                            </Button>

                            <div>
                              <PatientDetailsPopup patientId={patient.id} />
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {totalPages > 1 && (
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
              )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
