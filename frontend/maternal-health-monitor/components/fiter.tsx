"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type RecentActivityFiltersProps = {
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onTypeChange: (value: string) => void;
};

export default function RecentActivityFilters({
  onSearchChange,
  onStatusChange,
  onTypeChange,
}: RecentActivityFiltersProps) {
  return (
    <div className="w-full bg-white rounded-lg p-4 shadow">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Input */}
        <Input
          placeholder="Search by name, email or phone number"
          className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          onChange={(e) => onSearchChange(e.target.value)}
        />

        {/* Status Filter */}
        <Select onValueChange={onStatusChange}>
          <SelectTrigger className="w-full border-gray-300 focus:border-blue-500 focus:ring-gray-500">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        {/* Type Filter */}
        <Select onValueChange={onTypeChange}>
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
