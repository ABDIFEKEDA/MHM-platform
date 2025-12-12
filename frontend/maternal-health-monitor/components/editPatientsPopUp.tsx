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
import { useToast } from "@/components/ui/use-toast";
import  Patients from "@/app/type/patients";

function EditPatientPopup({ patient }: { patient: Patients }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: patient.name || "",
    email: patient.email || "",
    phone: patient.phone || "",
    age: patient.age || "",
    pregnancy_stage: patient.pregnancy_stage || "",
    medical_history: patient.medical_history || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
       const token =
         typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const res = await fetch(`http://localhost:4000/api/patients/${patient.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
         ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || res.statusText || "Failed to update patient");
      }

      toast({
        title: "Success",
        description: "Patient updated successfully!",
        variant: "success",
      });

      setOpen(false); 
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Error updating patient",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)} className="bg-green-600 hover:bg-yellow-700 cursor-pointer">
          Click Here to Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-lg shadow-xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Edit  patients Details
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Update patient details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <Input name="name" placeholder="Patient Name" value={formData.name} onChange={handleChange} />
            <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <Input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
            <Input name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
            <Input name="pregnancy_stage" placeholder="Pregnancy Stage" value={formData.pregnancy_stage} onChange={handleChange} />
            <Input name="medical_history" placeholder="Medical History" value={formData.medical_history} onChange={handleChange} />
          </div>

          <DialogFooter>
            <div className="flex justify-end gap-4">
              <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                Save Changes
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditPatientPopup;
