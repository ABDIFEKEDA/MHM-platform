"use client";

import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";

function VitalsPatientPopup() {
  const [formData, setFormData] = useState({
    patient_id: "",
    bp_systolic: "",
    bp_diastolic: "",
    heart_rate: "",
    respiratory_rate: "",
    temperature: "",
    blood_sugar: "",
    hemoglobin: "",
    weight: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const body = { ...formData };

      const res = await fetch(
        `http://localhost:4000/api/${formData.patient_id}/vitals`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(errorData.message || "Failed to register patient");
      }

      const data = await res.json();
      console.log("Vitals registered:", data);
      alert("Vitals registered successfully!");
    } catch (err) {
      console.error(err);
      alert("Error registering vitals");
    }
  };

  return (
    <Dialog>
      <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-md" />
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Add Vitals</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Patient Vitals</DialogTitle>
          <DialogDescription>
            Fill out the form to add new vitals.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input name="patient_id" placeholder="Enter patient ID" value={formData.patient_id} onChange={handleChange} />
            <Input name="bp_systolic" type="number" placeholder="Blood Pressure Systolic" value={formData.bp_systolic} onChange={handleChange} />
            <Input name="bp_diastolic" type="number" placeholder="Blood Pressure Diastolic" value={formData.bp_diastolic} onChange={handleChange} />
            <Input name="heart_rate" type="number" placeholder="Heart Rate" value={formData.heart_rate} onChange={handleChange} />
            <Input name="respiratory_rate" type="number" placeholder="Respiratory Rate" value={formData.respiratory_rate} onChange={handleChange} />
            <Input name="temperature" type="number" placeholder="Temperature (°C)" value={formData.temperature} onChange={handleChange} />
            <Input name="blood_sugar" type="number" placeholder="Blood Sugar" value={formData.blood_sugar} onChange={handleChange} />
            <Input name="hemoglobin" type="number" placeholder="Hemoglobin" value={formData.hemoglobin} onChange={handleChange} />
          </div>
          <Input name="weight" type="number" placeholder="Enter weight" value={formData.weight} onChange={handleChange} />

          <DialogFooter>
            <div className="flex justify-center gap-4">
              <Button variant="outline" type="button" className="cursor-pointer">
                Cancel
              </Button>
              <Button type="submit" className="cursor-pointer">
                Submit
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default VitalsPatientPopup;
