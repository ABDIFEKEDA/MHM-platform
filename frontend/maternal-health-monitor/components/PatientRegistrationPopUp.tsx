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

function RegisterPatientPopup() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);   
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    pregnancy_stage: "",
    medical_history: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const res = await fetch("http://localhost:4000/api/patients/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => null); 

      if (!res.ok) {
        throw new Error(data?.message || res.statusText || "Failed to register patient");
      }

      console.log("Patient registered:", data);

      toast({
        title: "Success",
        description: "Patient registered successfully!",
        variant: "success",
      });

      setOpen(false);   

    } catch (err) {
      console.error("Patient registration failed:", err);
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Error registering patient",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-md" />
      <DialogTrigger asChild>
        <Button className="cursor-pointer" onClick={() => setOpen(true)}>
          Register Patient
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register New Patient</DialogTitle>
          <DialogDescription>
            Fill out the form to add a new patient.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input name="name" placeholder="Patient Name" value={formData.name} onChange={handleChange} />
            <Input name="email" type="email" placeholder="Enter your Email" value={formData.email} onChange={handleChange} />
            <Input name="phone" placeholder="Contact Info" value={formData.phone} onChange={handleChange} />
            <Input name="age" placeholder="Your Age" value={formData.age} onChange={handleChange} />
            <Input name="pregnancy_stage" placeholder="Pregnancy Stage" value={formData.pregnancy_stage} onChange={handleChange} />
            <Input name="medical_history" placeholder="Medical History" value={formData.medical_history} onChange={handleChange} />
          </div>

          <DialogFooter>
            <div className="flex justify-center gap-4">
              <Button variant="outline" type="button" className="cursor-pointer" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="cursor-pointer">Submit</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default RegisterPatientPopup;
