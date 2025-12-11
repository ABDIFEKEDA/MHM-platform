"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogOverlay,
} from "@/components/ui/dialoge";
import { Button } from "@/components/ui/button";
import type Patient from "@/app/type/patients"; 


interface PatientDetailsPopupProps {
  patientId: string | number; 
}

function PatientDetailsPopup({ patientId }: PatientDetailsPopupProps) {
  const [open, setOpen] = useState(false);
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (open && patientId) {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      fetch(`http://localhost:4000/api/patients/${patientId}`, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      })
        .then((res) => res.json())
        .then((data) => setPatient(data))
        .catch((err) => console.error("Error fetching patient:", err));
    }
  }, [open, patientId]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)} className="bg-gray-600 hover:bg-gray-700 cursor-pointer">
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-lg shadow-xl bg-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Patient Details
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Full history of this patient.
          </DialogDescription>
        </DialogHeader>

        {patient ? (
          <div className="space-y-3 mt-4">
            <div>
              <span className="font-semibold">Name:</span> {patient.name}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {patient.email}
            </div>
            <div>
              <span className="font-semibold">Phone:</span> {patient.phone}
            </div>
            <div>
              <span className="font-semibold">Age:</span> {patient.age}
            </div>
            <div>
              <span className="font-semibold">Pregnancy Stage:</span>{" "}
              {patient.pregnancy_stage}
            </div>
            <div>
              <span className="font-semibold">Medical History:</span>{" "}
              {patient.medical_history}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 mt-4">Loading patient details...</p>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PatientDetailsPopup;
