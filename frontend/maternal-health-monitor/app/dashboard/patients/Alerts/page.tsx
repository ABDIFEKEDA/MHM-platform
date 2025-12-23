"use client";

import React from "react";
import PatientsLayout from "@/components/patientsLayout";
import VitalsPatientPopup from "@/components/vitalsPopUp";
import RecentActivityFilters from "@/components/fiter";
import ViewDetailPopUp from "@/components/ViewDetailPopUp";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Page = () => {
  const actions = [
    { label: "Add new Vitals", variant: "default" },
    { label: "Alert History", variant: "outline" },
    { label: "Contact caregiver", variant: "outline" },
    { label: "Notification", variant: "outline" },
  ];

  const alerts = [
    {
      message: "Received for Week 2 report",
      time: "2 hours ago",
      details: "Report submitted by caregiver. Review pending.",
    },
    {
      message: "Week 3 report due tomorrow",
      time: "1 hour ago",
      details: "Reminder to prepare and upload patient vitals for Week 3.",
    },
    {
      message: "Meeting scheduled with Doctors",
      time: "2 hours ago",
      details: "Meeting set for Friday at 10 AM with Dr. Smith.",
    },
  ];

  return (
    <PatientsLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#253D90]">
            Alerts & Patient Monitoring
          </h1>
          <VitalsPatientPopup />
        </div>

        {/* Filters */}
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <RecentActivityFilters />
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-[#253D90]">
              Alert List
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-2"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {alert.message}
                  </p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
                <ViewDetailPopUp alert={alert} />
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-center gap-2 pt-4">
            <Button variant="ghost" size="sm">1</Button>
            <Button variant="ghost" size="sm">2</Button>
            <Button variant="ghost" size="sm">Next</Button>
          </CardFooter>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 md:grid-cols-4 gap-4 pt-12">
          {actions.map((action, index) => (
            <Card key={index} className="shadow-sm hover:shadow-md transition">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#253D90]">
                  {action.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">{action.label}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PatientsLayout>
  );
};

export default Page;
