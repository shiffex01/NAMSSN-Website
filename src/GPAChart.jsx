import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const GPAChart = ({ faculty }) => {
  // dynamic levels by faculty
  const levels =
    faculty === "Engineering"
      ? [100, 200, 300, 400, 500]
      : [100, 200, 300, 400];

  // sample data (replace later with backend GPA data)
  const data = [
    { level: "100L", gpa: 3.4 },
    { level: "200L", gpa: 3.1 },
    { level: "300L", gpa: 3.8 },
    { level: "400L", gpa: 3.6 },
    faculty === "Engineering" && { level: "500L", gpa: 3.9 },
  ].filter(Boolean);

  return (
    <div className="flex items-center flex-col justify-center">
    <div className="bg-[#162c16] p-6 rounded-2xl shadow-xl lg:w-1/2 w-full items-center text-white md:mt-6 mt-8">
    <h2 className="text-2xl font-bold mb-4 text-center">GPA Progress Chart</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#0b3b0b" />
          <XAxis
            dataKey="level"
            stroke="#ffffff"
            tick={{ fill: "#cfcfcf", fontSize: 12 }}
          />
          <YAxis
            domain={[0, 5]}
            stroke="#ffffff"
            tick={{ fill: "#cfcfcf", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0b3b0b",
              border: "1px solid #2e7d32",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          <Line
            type="monotone"
            dataKey="gpa"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ fill: "#4ade80", strokeWidth: 2, r: 5 }}
            activeDot={{ r: 8, fill: "#86efac" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <p className="italic mt-3">For more information concerning your CGPA, visit your main dashboard at <span className="text-red-500 underline"> portal.abu.edu. </span> </p>
    </div>
  );
};

export default GPAChart;
