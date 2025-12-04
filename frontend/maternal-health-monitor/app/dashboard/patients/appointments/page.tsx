"use client";

// import { useState } from "react"
import PatientsLayout from "@/components/PatientsLayout";
import AppointmentPopup from "@/components/AppointmentPopUp";
// import { Calendar } from "@/components/ui/calendar"

function AppointmentDashboard() {
  //   const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <PatientsLayout>
      <div>
        <h1 className="text-2xl text-blue-900 font-bold">
          Appointment Dashboard
        </h1>
        <div className="flex justify-between mt-4">
          <div>
            <p>This is where appointment details will be displayed.</p>
          </div>
          <div>
            <AppointmentPopup />
          </div>
        </div>
        
      </div>
    </PatientsLayout>
  );
}

export default AppointmentDashboard;
