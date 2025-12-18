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
import { Textarea } from "@/components/ui/textarea";

function AppointmentPopup() {
  const [formData, setFormData] = useState({
    patient_id: "",
    name: "",
    email: "",
    appointment_date: "",
    reason: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog>
      <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-md" />
      <DialogTrigger asChild>
        <Button className="cursor-pointer p-6 bg-[#0F2B8F]">+ New Appointment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule the New Appointment</DialogTitle>
          <DialogDescription>
            Fill out the form to schedule a new appointment.
          </DialogDescription>
        </DialogHeader>

        <form>
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="patient_id"
              placeholder="Enter patient ID"
              value={formData.patient_id}
              onChange={handleChange}
            />
            <Input
              name="name"
              type="text"
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              name="appointment_date"
              type="date"
              placeholder="Appointment Date"
              value={formData.appointment_date}
              onChange={handleChange}
            />
            <Input
              name="email"
              type="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
            />

            <div className="col-span-2 mb-4">
              <Textarea
                name="reason"
                placeholder="Reason"
                value={formData.reason}
                onChange={handleChange}
              />
            </div>
          </div>

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

export default AppointmentPopup;
