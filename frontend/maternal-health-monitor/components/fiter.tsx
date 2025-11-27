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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <Input
          placeholder="Search doctors by doctors name, email or phone number"
        />
          
          {/* Filter by Status */}
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          {/* Filter by Type */}
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="attachment">doctor name</SelectItem>
              <SelectItem value="internship">Email</SelectItem>
              <SelectItem value="volunteer">phone number</SelectItem>
            </SelectContent>
          </Select>

        </div>
  );
}
