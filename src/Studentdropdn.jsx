import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function StudentDropdown({ allScores, setScores }) {
  const [level, setLevel] = useState("");
  const [semester, setSemester] = useState("");

  const filterScores = () => {
    if (!level || !semester) return allScores;

    const startDigit = level[0];

    const wantOdd = semester === "First Semester";
    const wantEven = semester === "Second Semester";

    return allScores.filter((item) => {
      const code = item.code;

      const startsCorrectly = code.startsWith(startDigit);
      const lastDigit = Number(code[code.length - 1]);

      const endsCorrectly =
        (wantOdd && lastDigit % 2 === 1) ||
        (wantEven && lastDigit % 2 === 0);

      return startsCorrectly && endsCorrectly;
    });
  };

  // Whenever level/semester changes → update the main table
  useEffect(() => {
    const filtered = filterScores();
    setScores(filtered);
  }, [level, semester]);

  return (
    <div className="flex flex-col w-full md:w-[80%] md:gap-10 gap-6 md:flex-row">

      {/* Level */}
      <div className="flex flex-col w-full">
        <label className="text-sm font-semibold text-gray-700 mb-1">
          Level
        </label>
        <div className="relative">
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="appearance-none w-full p-2 border border-gray-300 rounded-md bg-white text-[#0b3b0b] focus:ring-2 focus:ring-green-700"
          >
            <option value="">Select Level</option>
            <option>100L</option>
            <option>200L</option>
            <option>300L</option>
          </select>
          <ChevronDown size={18} className="absolute right-3 top-3 text-[#0b3b0b] pointer-events-none" />
        </div>
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
          <ChevronDown size={18} className="absolute right-3 top-3 text-[#0b3b0b] pointer-events-none" />
        </div>
      </div>

    </div>
  );
}
