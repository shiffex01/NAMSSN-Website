import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function StudentDropdown() {
  const [session, setSession] = useState("");
  const [semester, setSemester] = useState("");

  return (
    <div className="flex flex-col w-full md:w-[80%] md:gap-10 gap-6 md:flex-row">
      {/* Academic Session */}
      <div className="flex flex-col w-full">
        <label className="text-sm font-semibold text-gray-700 mb-1">
          Academic Session
        </label>
        <div className="relative">
          <select
            value={session}
            onChange={(e) => setSession(e.target.value)}
            className="appearance-none w-full p-2 border border-gray-300 rounded-md bg-white text-[#0b3b0b] focus:ring-2 focus:ring-green-700"
          >
            <option value="">Select Session</option>
            <option>2023/2024</option>
            <option>2024/2025</option>
            <option>2025/2026</option>
          </select>
          <ChevronDown
            size={18}
            className="absolute right-3 top-3 text-[#0b3b0b] pointer-events-none"
          />
        </div>

        {/* Selected Session Display */}
        {session && (
          <p className="mt-2 text-sm text-green-800">
            Selected session: <span className="font-semibold">{session}</span>
          </p>
        )}
      </div>

      {/* Semester */}
      <div className="flex flex-col w-full">
        <label className="text-sm font-semibold text-gray-700 mb-1">
          Semester
        </label>
        <div className="relative">
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="appearance-none w-full p-2 border border-gray-300 rounded-md bg-white text-[#0b3b0b] focus:ring-2 focus:ring-green-700"
          >
            <option value="">Select Semester</option>
            <option>First Semester</option>
            <option>Second Semester</option>
          </select>
          <ChevronDown
            size={18}
            className="absolute right-3 top-3 text-[#0b3b0b] pointer-events-none"
          />
        </div>

        {/* Selected Semester Display */}
        {semester && (
          <p className="mt-2 text-sm text-green-800">
            Selected semester: <span className="font-semibold">{semester}</span>
          </p>
        )}
      </div>
    </div>
  );
}
