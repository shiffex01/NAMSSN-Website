
import React, { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Send, User, MessageSquareText, AlertCircle } from "lucide-react";

const dark = "bg-[#122F2B]";
const darkBorder = "border border-emerald-200/80";
const soft = "bg-[#CFE7E0]";

function SectionTitle({ children }) {
  return (
    <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide sm:tracking-widest text-[#0b0b0b] uppercase mb-3">
      {children}
    </h2>
  );
}

function DarkCard({ children }) {
  return <div className={`${dark} ${darkBorder} rounded-md shadow-sm`}>{children}</div>;
}

function SoftCard({ children }) {
  return <div className="rounded-md border border-emerald-200/80 bg-white shadow-sm">{children}</div>;
}

function TableHead({ children }) {
  return (
    <th className={`px-3 py-3 text-left text-xs sm:text-sm font-extrabold text-white ${darkBorder}`}>
      {children}
    </th>
  );
}

function Td({ children, className = "" }) {
  return (
    <td className={`px-3 py-3 text-xs sm:text-sm text-gray-800 border border-emerald-200/80 ${className}`}>
      {children}
    </td>
  );
}

function StatPill({ label, value }) {
  return (
    <div className={`rounded-md ${soft} border border-emerald-200/80 px-3 py-2`}>
      <p className="text-[11px] sm:text-xs font-extrabold tracking-widest text-[#122F2B] uppercase">
        {label}
      </p>
      <p className="mt-1 text-lg sm:text-xl font-extrabold text-[#122F2B]">{value}</p>
    </div>
  );
}

function Bubble({ side = "left", children, meta }) {
  const left = side === "left";
  return (
    <div className={`flex ${left ? "justify-start" : "justify-end"}`}>
      <div
        className={[
          "max-w-[85%] rounded-md px-3 py-2 text-sm border",
          left
            ? "bg-white border-emerald-200/80 text-[#122F2B]"
            : "bg-[#CFE7E0] border-emerald-200/80 text-[#122F2B]",
        ].join(" ")}
      >
        <div className="whitespace-pre-wrap leading-relaxed">{children}</div>
        {meta ? <div className="mt-1 text-[11px] text-[#122F2B]/70 font-semibold">{meta}</div> : null}
      </div>
    </div>
  );
}

export default function PerStudentsInfo() {
  const navigate = useNavigate();
  const { reg_number } = useParams(); // ✅ /admin/student/:reg_number

  // ✅ MOCK: students list (later: fetch by reg_number)
  const students = useMemo(
    () => [
      {
        reg_number: "D2Y4510",
        name: "Shiffy Anny",
        email: "shiffy@example.com",
        phone: "0800000000",
        level: "200L",
        cgp: "3.00",
        department: "Mathematics",
        status: "Active",
      },
      {
        reg_number: "D2Y4511",
        name: "John Kamal",
        email: "john@example.com",
        phone: "0801111111",
        level: "300L",
        cgp: "4.00",
        department: "Mathematics",
        status: "Active",
      },
    ],
    []
  );

  const student = useMemo(() => {
    return students.find((s) => s.reg_number === reg_number) || null;
  }, [students, reg_number]);

  // ✅ MOCK: complaints (later: fetch by reg_number)
  const complaints = useMemo(
    () => [
      {
        ref: "D2Y4510",
        course: "MATH311",
        score: "80/100",
        cgp: "4.56",
        complaint: "Request for review of Math311",
        status: "Resolved",
      },
      {
        ref: "D2Y4510",
        course: "MATH201",
        score: "—",
        cgp: "—",
        complaint: "Unable to find MAT201 score",
        status: "Open",
      },
      {
        ref: "D2Y4510",
        course: "MATH309",
        score: "78/100",
        cgp: "4.20",
        complaint: "Score mismatch (Test/Exam)",
        status: "New",
      },
    ],
    []
  );

  // ✅ MOCK: chat (later: fetch messages by reg_number)
  const [messages, setMessages] = useState([
    { id: 1, by: "student", text: "Good afternoon sir/ma, my score is missing for MAT201.", time: "10:12 AM" },
    { id: 2, by: "admin", text: "Noted. I will check with the lecturer and update you.", time: "10:14 AM" },
  ]);
  const [draft, setDraft] = useState("");

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), by: "admin", text, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
    ]);
    setDraft("");
  };

  if (!student) {
    return (
      <div className="min-h-screen w-full bg-white overflow-y-auto">
        <div className="px-3 sm:px-6 lg:px-10 py-5 sm:py-6 pb-16">
          <SectionTitle>STUDENT PROFILE</SectionTitle>

          <SoftCard>
            <div className={`${soft} rounded-t-md px-4 sm:px-5 py-4 border-b border-emerald-200/80`}>
              <div className="flex items-center gap-2">
                <AlertCircle className="text-[#122F2B]" size={18} />
                <p className="font-extrabold text-[#122F2B]">Student not found</p>
              </div>
            </div>

            <div className="p-4 sm:p-5">
              <p className="text-sm sm:text-base text-[#122F2B]">
                The student with reg number <span className="font-extrabold">{reg_number}</span> is not in mock data.
                When you connect DB later, this will load from API.
              </p>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className={`mt-4 inline-flex items-center gap-2 ${dark} ${darkBorder} rounded-md px-4 py-3 text-sm sm:text-base font-extrabold tracking-wide text-white hover:brightness-110 active:scale-[0.99] transition`}
              >
                <ArrowLeft size={18} />
                Back
              </button>
            </div>
          </SoftCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white overflow-y-auto">
      <div className="px-3 sm:px-6 lg:px-10 py-5 sm:py-6 pb-16">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <SectionTitle>STUDENT PROFILE</SectionTitle>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className={`inline-flex items-center gap-2 ${dark} ${darkBorder} rounded-md px-4 py-3 text-sm sm:text-base font-extrabold tracking-wide text-white hover:brightness-110 active:scale-[0.99] transition`}
          >
            <ArrowLeft size={18} />
            Back to Students
          </button>
        </div>

        {/* LAYOUT: left content + chat */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* LEFT: info + complaints */}
          <div className="lg:col-span-2 space-y-4">
            {/* Student details card */}
            <SoftCard>
              <div className={`${soft} rounded-t-md px-4 sm:px-5 py-4 border-b border-emerald-200/80`}>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-[#122F2B]" />
                    <p className="font-extrabold text-[#122F2B]">Name: {student.name}</p>
                  </div>
                  <p className="text-sm font-bold text-[#122F2B]">
                    Matric No: <span className="font-extrabold">{student.reg_number}</span>
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <StatPill label="Level" value={student.level} />
                  <StatPill label="CGP" value={student.cgp} />
                  <StatPill label="Status" value={student.status} />
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-md border border-emerald-200/80 p-3">
                    <p className="text-xs font-extrabold tracking-widest text-[#122F2B] uppercase">Email</p>
                    <p className="mt-1 text-sm font-semibold text-[#122F2B] break-words">{student.email}</p>
                  </div>
                  <div className="rounded-md border border-emerald-200/80 p-3">
                    <p className="text-xs font-extrabold tracking-widest text-[#122F2B] uppercase">Phone</p>
                    <p className="mt-1 text-sm font-semibold text-[#122F2B]">{student.phone}</p>
                  </div>
                </div>

                <div className="mt-3 rounded-md border border-emerald-200/80 p-3">
                  <p className="text-xs font-extrabold tracking-widest text-[#122F2B] uppercase">Department</p>
                  <p className="mt-1 text-sm font-semibold text-[#122F2B]">{student.department}</p>
                </div>
              </div>
            </SoftCard>

            {/* Complaints table */}
            <SoftCard>
              <div className={`${soft} rounded-t-md px-4 sm:px-5 py-4 border-b border-emerald-200/80`}>
                <p className="font-extrabold text-[#122F2B] tracking-widest uppercase text-sm sm:text-base">
                  Complaints & Issues
                </p>
              </div>

              <div className="p-3 sm:p-4">
                <div className="overflow-x-auto">
                  <table className="min-w-[860px] w-full border-collapse">
                    <thead>
                      <tr className={`${dark} text-white`}>
                        <TableHead>Reference ID</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Total Score</TableHead>
                        <TableHead>CGP</TableHead>
                        <TableHead>Complaint</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </tr>
                    </thead>

                    <tbody className="bg-white">
                      {complaints.map((c, idx) => (
                        <tr key={idx} className="hover:bg-emerald-50/40">
                          <Td className="font-extrabold text-[#122F2B]">{c.ref}</Td>
                          <Td className="font-bold">{c.course}</Td>
                          <Td>{c.score}</Td>
                          <Td className="font-extrabold">{c.cgp}</Td>
                          <Td>{c.complaint}</Td>
                          <Td className="font-bold">{c.status}</Td>
                          <Td>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                className="rounded bg-[#CFE7E0] px-3 py-2 text-xs md:text-sm font-extrabold text-[#122F2B] hover:brightness-95 active:scale-[0.99] transition"
                                onClick={() => alert(`Resolve (mock): ${c.course}`)}
                              >
                                Resolve
                              </button>
                              <button
                                type="button"
                                className="rounded bg-white px-3 py-2 text-xs md:text-sm font-extrabold text-[#122F2B] border border-emerald-200/80 hover:bg-emerald-50 active:scale-[0.99] transition"
                                onClick={() => alert(`Reject (mock): ${c.course}`)}
                              >
                                Reject
                              </button>
                            </div>
                          </Td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </SoftCard>

            {/* Optional navigation button (if you later have announcements/results etc) */}
            <div className="flex justify-end">
              <Link to="admin/complaint_tickets">
                <button
                  className={`${dark} ${darkBorder} rounded-md px-4 py-3 text-sm sm:text-base cursor-pointer font-extrabold tracking-wide text-white hover:brightness-110 active:scale-[0.99] transition`}
                >
                  Go to Complaints Page
                </button>
              </Link>
            </div>
          </div>

          {/* RIGHT: Chat */}
          <div className="lg:col-span-1">
            <DarkCard>
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-white font-extrabold tracking-widest uppercase text-sm sm:text-base">
                    Chat
                  </p>
                  <MessageSquareText size={18} className="text-white/85" />
                </div>

                <p className="mt-1 text-white/75 text-xs sm:text-sm">
                  Messages with <span className="font-bold text-white">{student.name}</span>
                </p>

                <div className="mt-4 rounded-md border border-white/15 bg-white/10 p-3 h-[320px] overflow-y-auto space-y-3">
                  {messages.map((m) => (
                    <Bubble
                      key={m.id}
                      side={m.by === "admin" ? "right" : "left"}
                      meta={`${m.by === "admin" ? "You" : "Student"} • ${m.time}`}
                    >
                      {m.text}
                    </Bubble>
                  ))}
                </div>

                <div className="mt-3 flex gap-2">
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 rounded-md bg-white/10 border border-white/15 px-3 py-2 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-200/60"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") sendMessage();
                    }}
                  />
                  <button
                    type="button"
                    onClick={sendMessage}
                    className="rounded-md px-4 py-2 font-extrabold text-[#122F2B] bg-[#CFE7E0] hover:brightness-95 active:scale-[0.99] transition"
                    aria-label="Send"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </DarkCard>
          </div>
        </div>
      </div>
    </div>
  );
}
