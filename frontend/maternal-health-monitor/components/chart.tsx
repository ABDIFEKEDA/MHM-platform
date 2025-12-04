"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const data = [
  { name: "Normal", value: 45 },
  { name: "Moderate Risk", value: 25 },
  { name: "High Risk", value: 10 },
];


const COLORS = [
  "#22C55E", // Green → Normal
  "#F97316", // Orange → Moderate Risk
  "#EF4444", // Red → High Risk
];

export default function DashboardPieChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Pregnant Women Risk Distribution</CardTitle>
      </CardHeader>

      <CardContent className="h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
