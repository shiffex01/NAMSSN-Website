import { useState, useEffect, useMemo } from "react";
import { Printer, Search } from "lucide-react";
import StudentDropdown from "./Studentdropdn";

export default function Scoreboard() {
  // ✅ master list (never filtered)
  const [allScores, setAllScores] = useState([]);

  // ✅ table list (filtered)
  const [scores, setScores] = useState([]);

  const [session, setSession] = useState("2024/2025");
  const [semester, setSemester] = useState("300L");

  const [unitScores, setUnitScores] = useState([
    { test: 20, exam: 40 },
    { test: 25, exam: 35 },
    { test: 30, exam: 45 },
    { test: 28, exam: 50 },
  ]);

  // ✅ Safe setter: prevents scores becoming undefined/object
  const setScoresSafe = (next) => {
    if (typeof next === "function") {
      setScores((prev) => {
        const result = next(prev);
        return Array.isArray(result) ? result : prev;
      });
      return;
    }
    setScores(Array.isArray(next) ? next : []);
  };

 
  const handleChange = (index, e) => {
    const { name, value } = e.target;

    setUnitScores((prev) => {
      const updated = [...prev];
      const n = Number(value);
      updated[index] = { ...updated[index], [name]: Number.isFinite(n) ? n : 0 };
      return updated;
    });
  };

  useEffect(() => {
    const courseList = [
      { code: "MATH301", title: "Mathematical Method II" },
      { code: "MATH303", title: "Advanced Real Analysis" },
      { code: "MATH305", title: "Theory of Rings and Fields" },
      { code: "MATH307", title: "Complex Analysis" },
    ];

    const storedScores = (unitScores ?? []).map((score, index) => {
      const test = Number(score?.test ?? 0);
      const exam = Number(score?.exam ?? 0);
      const total = test + exam;

      return {
        code: courseList[index]?.code || `C-${index + 1}`,
        title: courseList[index]?.title || "Untitled Course",
        test,
        exam,
        total,
        status: total >= 40 ? "Passed" : "Failed",
      };
    });

    // ✅ set both
    setAllScores(storedScores);
    setScoresSafe(storedScores);
  }, [unitScores, session, semester]);


  const scoresList = Array.isArray(scores) ? scores : [];

  const totalScore = useMemo(() => {
    return scoresList.reduce((sum, item) => sum + Number(item?.total ?? 0), 0);
  }, [scoresList]);

  const gpa = useMemo(() => {
    if (scoresList.length === 0) return 0;
    return (totalScore / (scoresList.length * 100)) * 5;
  }, [scoresList.length, totalScore]);

  return (
    <div className="default">
      <div className="flex justify-between items-center mb-4">
        <h1 className="head1">SCOREBOARD</h1>
        <button className="md:flex hidden items-center gap-2 bg-green-500/40 hover:bg-green-600 text-white px-3 py-2 rounded-md">
          <Printer size={16} /> Print/export scoreboard
        </button>
      </div>

      {/* Filters */}
      <div className="flex w-full items-center justify-between flex-wrap mb-6">
        {/* ✅ pass master list + safe setter */}
        <StudentDropdown allScores={allScores} setScores={setScoresSafe} />

        <div className="bg-[#0b3b0b] p-4 rounded-md flex items-center md:mt-0 mt-4 justify-center w-fit md:w-[10%] h-12 cursor-pointer">
          <Search />
          <p className="md:hidden flex ml-2"> Search </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden">
          <thead className="bg-[#0b3b0b] text-gray-100">
            <tr>
              <th className="table_right">Course Code</th>
              <th className="table_right">Course Title</th>
              <th className="table_right">Test Score</th>
              <th className="table_right">Exam Score</th>
              <th className="table_right">Total Score</th>
              <th className="table_right">Status</th>
            </tr>
          </thead>

          <tbody className="bg-gray-100 text-[#0b3b0b]">
            {scoresList.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center font-semibold">
                  No scores available.
                </td>
              </tr>
            ) : (
              scoresList.map((item, index) => (
                <tr
                  key={`${item.code}-${index}`}
                  className="border-b font-semibold border-green-900 hover:bg-green-950 hover:text-white transition"
                >
                  <td className="p-3 table_right">{item.code}</td>
                  <td className="p-3 table_right">{item.title}</td>
                  <td className="p-3 table_right">{item.test}/40</td>
                  <td className="p-3 table_right">{item.exam}/60</td>
                  <td className="p-3 table_right">{item.total}/100</td>
                  <td className="p-3 table_right font-bold">{item.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom Section */}
      <div className="flex md:flex-row flex-col md:gap-0 gap-4 justify-between bg-none md:bg-[#0b3b0b] text-white mt-6 md:p-4 text-2xl md:pl-10 md:pr-10 rounded-b-lg">
        <p className="total_mob">
          Total: <span className="font-bold">{totalScore}/{scoresList.length * 100}</span>
        </p>
        <p className="total_mob">
          Expected GPA: <span className="font-bold">{Number(gpa).toFixed(2)}</span>
        </p>
      </div>

      <div className="flex items-center justify-center">
        <button className="flex md:hidden mt-4 items-center gap-2 bg-green-500/40 hover:bg-green-600 text-white px-3 py-2 rounded-md">
          <Printer size={16} /> Print/export scoreboard
        </button>
      </div>
    </div>
  );
}
