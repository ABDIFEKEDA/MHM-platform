"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialoge";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Alert {
  message: string;
  time: string;
  details: string;
}

function AlertItem({ alert }: { alert: Alert }) {
  return (
    <Dialog>
      <div className="flex items-center justify-between border-b pb-2">
        <div>
          <p className="text-sm font-medium text-gray-800">{alert.message}</p>
          <p className="text-xs text-muted-foreground">{alert.time}</p>
        </div>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-[#253D90]">
            Alert Details
          </DialogTitle>
          <DialogDescription>
            Expanded information about this alert.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Message:</strong> {alert.message}</p>
          <p><strong>Time:</strong> {alert.time}</p>
          <p><strong>Details:</strong> {alert.details}</p>
        </div>

        <DialogFooter>
          <Button variant="outline">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function AlertList() {
  const alerts: Alert[] = [
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
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-[#253D90]">
          Alert List
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert, index) => (
          <AlertItem key={index} alert={alert} />
        ))}
      </CardContent>
      <CardFooter className="flex justify-center gap-2 pt-4">
        <Button variant="ghost" size="sm">1</Button>
        <Button variant="ghost" size="sm">2</Button>
        <Button variant="ghost" size="sm">Next</Button>
      </CardFooter>
    </Card>
  );
}
