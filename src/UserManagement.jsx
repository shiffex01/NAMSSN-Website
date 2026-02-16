import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Users } from "lucide-react";
import { API_BASE } from "./api";

const dark = "bg-[#122F2B]";
const darkBorder = "border border-emerald-200/80";
const soft = "bg-[#CFE7E0]";

function DarkCard({ children }) {
  return <div className={`${dark} ${darkBorder} rounded-md shadow-sm`}>{children}</div>;
}

function SoftCard({ children }) {
  return <div className="rounded-md border border-emerald-200/80 bg-white shadow-sm">{children}</div>;
}

function TableHead({ children }) {
  return <th className={`table_head text-white ${darkBorder}`}>{children}</th>;
}

function Td({ children, className = "" }) {
  return <td className={`table_contents ${className}`}>{children}</td>;
}

export default function UserManagement() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState("");

  useEffect(() => {
  const run = async () => {
    setLoading(true);
    try {
      const url = `${API_BASE}/admin/list_students.php`;
      console.log("Calling:", url);

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ q: "" }),
      });

      const data = await res.json();
      console.log("HTTP:", res.status);
      console.log("API RAW:", data);

      if (!res.ok || data.status !== "success") {
        throw new Error(data.message || "Failed to load students");
      }

      const rows = Array.isArray(data.data) ? data.data : [];
      console.log("ROWS:", rows);

      setStudents(rows);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  run();
}, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return students;

    return students.filter((s) =>
      [s.reg_number, s.name, s.level].some((x) =>
        String(x || "").toLowerCase().includes(q)
      )
    );
  }, [students, query]);

  const totalStudents = students.length;
  const showingCount = filtered.length;

  const goToStudent = (regNumber) => {
    navigate(`/admin/student_info/${regNumber}`);
  };

  return (
    <div className="min-h-screen w-full bg-white overflow-y-auto">
      <div className="px-3 sm:px-6 lg:px-10 py-5 sm:py-6 pb-16">
        {/* ✅ Small top card (summary) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <DarkCard>
            <div className="p-4 sm:p-5 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-white text-base md:text-2xl font-bold uppercase tracking-widest">
                  Total Students
                </p>
                <p className="mt-2 text-white text-3xl sm:text-4xl font-extrabold leading-none">
                  {totalStudents}
                </p>
                <p className="mt-2 text-white/80 text-xs sm:text-sm">
                  Showing: <span className="font-bold text-white">{showingCount}</span>
                </p>
              </div>
              <div className="text-white/90">
                <Users size={28} />
              </div>
            </div>
          </DarkCard>

          <SoftCard>
            <div className={`${soft} rounded-md px-4 sm:px-5 py-4 border border-emerald-200/80`}>
              <p className="text-[#122F2B] font-extrabold tracking-widest uppercase text-sm sm:text-base">
                Quick Tip
              </p>
              <p className="mt-2 text-[#122F2B] text-sm sm:text-base font-semibold">
                Click any student row (or “View”) to open their profile page.
              </p>
            </div>
          </SoftCard>
        </div>

        {/* ✅ Main students table card */}
        <DarkCard>
          <div className="p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3 flex-col lg:flex-row">
              <div className="min-w-0">
                <p className="text-white md:text-2xl text-xl font-extrabold tracking-widest uppercase">
                  Total Students List
                </p>
                <p className="text-white/80 text-sm sm:text-base mt-1">
                  Search by matric number, name, or level. Click a student to view details.
                </p>
              </div>

              {/* Search */}
              <div className="w-full lg:w-[380px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" size={16} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search students..."
                    className="w-full rounded-md bg-white/10 border border-white/15 pl-9 pr-3 py-2 text-sm text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-200/60"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="min-w-[820px] w-full border-collapse">
                <thead>
                  <tr className={`${dark} text-white`}>
                    <TableHead>Matric No.</TableHead>
                    <TableHead>Student&apos;s Name</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>CGP</TableHead>
                    <TableHead>Complaints</TableHead>
                    <TableHead>Actions</TableHead>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-6 text-sm text-gray-600">
                        Loading students...
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-6 text-sm text-gray-600">
                        No students found.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((s, idx) => (
                      <tr
                        key={`${s.reg_number}-${idx}`}
                        className="cursor-pointer hover:bg-emerald-50/40"
                        onClick={() => goToStudent(s.reg_number)}
                      >
                        <Td className="font-extrabold text-[#122F2B]">{s.reg_number}</Td>
                        <Td className="font-semibold">{s.name}</Td>
                        <Td>{s.level}</Td>
                        <Td className="font-extrabold">{s.cgp}</Td>
                        <Td className="font-bold">{s.complaints}</Td>
                        <Td onClick={(e) => e.stopPropagation()}>
                          <div className="flex gap-2">
                            <Link to={`/admin/student_info/${s.reg_number}`}>
                              <button
                                type="button"
                                className="rounded bg-[#CFE7E0] px-3 py-2 text-xs md:text-sm font-extrabold text-[#122F2B] hover:brightness-95 active:scale-[0.99] transition cursor-pointer"
                              >
                                View
                              </button>
                            </Link>
                          </div>
                        </Td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </DarkCard>
      </div>
    </div>
  );
}