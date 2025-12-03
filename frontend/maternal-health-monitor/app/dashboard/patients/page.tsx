"use client";
import { useState } from "react";
import React from "react";
import PatientsLayout from "@/components/PatientsLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Mail } from "lucide-react";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Card } from "@/components/ui/card";

import RegisterPatientPopup from "@/components/PatientRegistrationPopUp";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <PatientsLayout>
      <div className="bg-gray-200">
       
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-[#253D90] flex items-center ">
            Patients Dashboard
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
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="">
            <CardHeader>
              <h2 className="text-xl font-semibold ">Name of Patients</h2>
              <CardContent>
                <p className="text-xl font-bold"> Misiree</p>
              </CardContent>
            </CardHeader>
          </Card>
          <Card className="">
            <CardHeader>
              <h2 className="text-xl font-semibold mb-2">Name of Doctors</h2>
              <CardContent>
                <p className="text-xl font-bold">Dr.Abdi Fk</p>
              </CardContent>
            </CardHeader>
          </Card>
          <Card className="">
            <CardHeader>
              <h2 className="text-xl font-semibold mb-2">Reports</h2>
              <CardContent>
                <p className="text-xl font-bold">2/3</p>
              </CardContent>
            </CardHeader>
          </Card>
          <Card className="">
            <CardHeader>
              <h2 className="text-xl font-semibold mb-2">Pregnancy Stage</h2>
              <CardContent>
                <p className="text-xl font-bold">Frist Trimester</p>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <div className="flex justify-end bg-gray-200 py-4 ">
        {/* <Button onClick={()=>setIsOpen(true)} ></Button> */}
        <RegisterPatientPopup isOpen={isOpen} setIsOpen={setIsOpen}/> 
        </div>
        <div className="p-6 mt-4 bg-white rounded-lg shadow grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="hover:shadow-lg transition-shadow duration-300 gradient-border">
            <CardHeader>
              <h2 className="text-2xl font-bold  text-[#0F2B8F] ">Alerts</h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="text-red-600">
                  <p>blood pressure detected on 2024-06-10.</p>
                </li>
                <li className="text-yellow-600">
                  Missed appointment on 2024-06-08.
                </li>
                <li className="text-red-600">
                  Elevated glucose levels on 2024-06-05.
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-300 gradient-border">
            <CardHeader>
              <h2 className="text-2xl font-bold mb-4 text-[#0F2B8F]">
                Notifications
              </h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 ">
                <li className="text-gray-800">
                  New message from Dr. Abdi Fk on 2024-06-11.
                </li>
                <li className="">
                  Lab results available for review on 2024-06-09.
                </li>
                <li className="text-gray-800">
                  Upcoming appointment reminder for 2024-06-15.
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-300 gradient-border">
            <CardHeader>
              <h2 className="text-2xl font-bold mb-4 text-[#0F2B8F]">
                Messages
              </h2>
            </CardHeader>
            <CardContent>
              <ul className=" space-y-2">
                <li className="text-gray-800">
                  Message from Dr. Abdi Fk Please schedule a follow-up
                  appointment.
                </li>
                <li className="text-gray-800">
                  Message from Lab: Your recent test results are normal.
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-300 gradient-border">
            <CardHeader>
              <h2 className="text-2xl font-bold mb-4 text-[#0F2B8F]">
                Appointments
              </h2>
            </CardHeader>
            <CardContent>
              <ul className=" space-y-2">
                <li className="text-gray-800">
                  Upcoming appointment with Dr. Abdi Fk on 2024-06-15 at 10:00
                  AM.
                </li>
                <li className="text-gray-800">
                  Previous appointment on 2024-05-30 was completed successfully.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <h1 className="text-2xl font-bold text-[#253D90] flex items-center mt-10 ">
          Quick Actions
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 cursor-pointer">
          <Card className="hover:shadow-lg transition-shadow duration-300 gradient-border py-10 bg-gray-400">
            <CardHeader>
              <CardContent>
                <h2 className="text-xl font-semibold ">Alert History</h2>
              </CardContent>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-300 gradient-border py-10 bg-gray-400">
            <CardHeader>
              <CardContent>
                <h2 className="text-xl font-semibold ">View History</h2>
              </CardContent>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-300 gradient-border py-10 bg-gray-400">
            <CardHeader>
              <CardContent>
                <h2 className="text-xl font-semibold ">Message</h2>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
      </div>
    </PatientsLayout>
  );
};

export default Page;
