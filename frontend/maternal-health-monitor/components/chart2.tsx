"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const data = [
  { name: "Normal", total: 45 },
  { name: "Moderate Risk", total: 25 },
  { name: "High Risk", total: 10 },
];


const COLORS = [
  "#22C55E", 
  "#F97316", 
  "#EF4444", 
];

export default function DashboardChart2() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Maternal Health Risk Overview</CardTitle>
      </CardHeader>

      <CardContent className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="total" radius={[6, 6, 0, 0]}>
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
