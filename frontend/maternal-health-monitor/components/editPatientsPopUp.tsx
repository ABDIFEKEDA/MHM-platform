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
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Patients from "@/app/type/patients";

interface EditPatientPopupProps {
  patient: Patients;
  onPatientUpdate?: (updatedPatient: Patients) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function EditPatientPopup({ 
  patient, 
  onPatientUpdate, 
  open: externalOpen, 
  onOpenChange 
}: EditPatientPopupProps) {
  const { toast } = useToast();
  const [internalOpen, setInternalOpen] = useState(false);
  const [editingPatientId, setEditingPatientId] = useState<number | null>(null);
  
  
  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    pregnancy_stage: "",
    medical_history: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  
  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name || "",
        email: patient.email || "",
        phone: patient.phone || "",
        age: patient.age?.toString() || "",
        pregnancy_stage: patient.pregnancy_stage || "",
        medical_history: patient.medical_history || "",
      });
    }
  }, [patient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === "age" ? value.replace(/\D/g, '') : value 
    }));
  };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
   setEditingPatientId(patient);
  e.preventDefault();
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const res = await fetch(`http://localhost:4000/api/patients/${patient.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json().catch(() => ({})); 

    if (!res.ok) {
      throw new Error(data.message || `HTTP ${res.status}: Failed to update patient`);
    }

    toast({
      title: "Success",
      description: data.message || "Patient updated successfully!",
      variant: "success",
    });

     setEditingPatientId(null);
  } catch (err) {
    toast({
      title: "Error",
      description: err instanceof Error ? err.message : "Error updating patient",
      variant: "destructive",
    });
  }
};


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      {!onOpenChange && (
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="bg-yellow-600 hover:bg-yellow-700 text-white cursor-pointer border-yellow-600"
          >
            Edit
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="rounded-lg shadow-xl bg-white max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Edit Patient Details
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Update details for <span className="font-medium">{patient.name}</span> (ID: {patient.id})
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Full Name *
              </label>
              <Input 
                name="name" 
                placeholder="Patient Name" 
                value={formData.name} 
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Email *
                </label>
                <Input 
                  name="email" 
                  type="email" 
                  placeholder="email@example.com" 
                  value={formData.email} 
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Phone *
                </label>
                <Input 
                  name="phone" 
                  placeholder="Phone number" 
                  value={formData.phone} 
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Age
                </label>
                <Input 
                  name="age" 
                  type="text" 
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Age" 
                  value={formData.age} 
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Pregnancy Stage
                </label>
                <Input 
                  name="pregnancy_stage" 
                  placeholder="e.g., First Trimester" 
                  value={formData.pregnancy_stage} 
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Medical History
              </label>
              <Input 
                name="medical_history" 
                placeholder="Medical conditions, allergies, etc." 
                value={formData.medical_history} 
                onChange={handleChange}
              />
            </div>
          </div>

          <DialogFooter className="pt-4 border-t">
            <div className="flex justify-end gap-3 w-full">
              <Button 
                variant="outline" 
                type="button" 
                onClick={() => setIsOpen(false)}
                disabled={isSubmitting}
                className="border-gray-300"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditPatientPopup;