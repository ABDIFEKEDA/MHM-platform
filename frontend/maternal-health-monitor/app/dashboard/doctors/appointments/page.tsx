"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DoctorLayOut from "@/components/PatientsLayout";
import AppointmentPopup from "@/components/AppointmentPopUp";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Building2,
  HospitalIcon,
  User2Icon,
  Users,
  Bell,
  TrendingUp,
} from "lucide-react";

function AppointmentDashboard() {
  return (
    <DoctorLayOut>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-10 ">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User2Icon className="h-5 w-5 text-blue-600" />
                    <span>Patients Name</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">missed Appointment</span>
                    <Badge className="bg-red-100 text-red-800">7 days</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5 text-green-600" />
                    <span>patients Hospital_Id</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold"> Id</span>
                    <Badge className="bg-green-100 text-green-800">00123</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <HospitalIcon className="h-5 w-5 text-purple-600" />
                    <span>Hospitals</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">name</span>
                    <Badge className="bg-purple-100 text-purple-800">
                      HuClinnic
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-red-600" />
                    <span>Doctor</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">name</span>
                    <Badge className="bg-red-100 text-red-800">Dr. Abdi</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Actions</CardTitle>
              <CardDescription>
                Items requiring Doctors attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h1> you have to attend your appointment</h1>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pending Actions</CardTitle>
            <CardDescription>Items requiring Doctors attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h1> you have to attend your appointment</h1>
            </div>
          </CardContent>
        </Card>
        <div className="py-4">
          <Card >
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Review Patients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
                <Button
                  className="h-20 flex-col space-y-2 bg-transparent"
                  variant="outline"
                  // onClick={() => router.push("/dashboard/admin/users")}
                >
                  <Users className="h-6 w-6" />
                  <span>Message</span>
                </Button>
                <Button
                  className="h-20 flex-col space-y-2 bg-transparent"
                  variant="outline"
                  // onClick={() => router.push("/dashboard/admin/roles")}
                >
                  <Shield className="h-6 w-6" />
                  <span>High Risk</span>
                </Button>
                <Button
                  className="h-20 flex-col space-y-2 bg-transparent"
                  variant="outline"
                  // onClick={() => router.push("/dashboard/admin/notifications")}
                >
                  <Bell className="h-6 w-6" />
                  <span>Notification</span>
                </Button>
                <Button
                  className="h-20 flex-col space-y-2 bg-transparent"
                  variant="outline"
                  // onClick={() => router.push("/dashboard/admin/settings")}
                >
                  <TrendingUp className="h-6 w-6" />
                  <span>View Alert</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DoctorLayOut>
  );
}

export default AppointmentDashboard;
