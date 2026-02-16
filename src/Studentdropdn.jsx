import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function StudentDropdown({ allScores, setScores }) {
  const [level, setLevel] = useState("");
  const [semester, setSemester] = useState("");

  const applyFilter = (nextLevel, nextSemester) => {
    if (!Array.isArray(allScores)) {
      setScores([]);
      return;
    }

    if (!nextLevel || !nextSemester) {
      setScores(allScores);
      return;
    }

    const wantLevelDigit = nextLevel[0]; 
    const wantOdd = nextSemester === "First Semester";
    const wantEven = nextSemester === "Second Semester";

    const filtered = allScores.filter((item) => {
      const code = String(item?.code ?? "").trim(); 
      const digits = code.match(/\d+/)?.[0];        // trim the digits out
      if (!digits) return false;

      const levelDigit = digits[0];
      const lastDigit = Number(digits[digits.length - 1]);

      const levelOk = levelDigit === wantLevelDigit;
      const semOk =
        (wantOdd && lastDigit % 2 === 1) ||
        (wantEven && lastDigit % 2 === 0);

      return levelOk && semOk;
    });

    setScores(filtered);
  };

  const onLevelChange = (e) => {
    const nextLevel = e.target.value;
    setLevel(nextLevel);
    applyFilter(nextLevel, semester);
  };

  const onSemesterChange = (e) => {
    const nextSemester = e.target.value;
    setSemester(nextSemester);
    applyFilter(level, nextSemester);
  };

  return (
    <div className="flex flex-col w-full md:w-[80%] md:gap-10 gap-6 md:flex-row">
      {/* Level */}
      <div className="flex flex-col w-full">
        <label className="text-sm font-semibold text-gray-700 mb-1">Level</label>
        <div className="relative">
          <select
            value={level}
            onChange={onLevelChange}
            className="appearance-none w-full p-2 border border-gray-300 rounded-md bg-white text-[#0b3b0b] focus:ring-2 focus:ring-green-700"
          >
            <option value="">Select Level</option>
            <option>100L</option>
            <option>200L</option>
            <option>300L</option>
            <option>400L</option>
          </select>
          <ChevronDown size={18} className="absolute right-3 top-3 text-[#0b3b0b] pointer-events-none" />
        </div>
      </div>

      {/* Semester */}
      <div className="flex flex-col w-full">
        <label className="text-sm font-semibold text-gray-700 mb-1">Semester</label>
        <div className="relative">
          <select
            value={semester}
            onChange={onSemesterChange}
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
