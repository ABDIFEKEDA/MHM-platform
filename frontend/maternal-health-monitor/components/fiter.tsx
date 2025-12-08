"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RecentActivityFilters() {
  return (
    <div className="w-full bg-white  rounded-lg ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        
        <Input
          placeholder="Search by name, email or phone number"
          className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />

        
        <Select>
          <SelectTrigger className="w-full border-gray-300 focus:border-blue-500 focus:ring-gary-500">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        {/* Type Filter */}
        <Select>
          <SelectTrigger className="w-full border-gray-300 focus:border-blue-500 focus:ring-gray-500">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="phone">Phone number</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
