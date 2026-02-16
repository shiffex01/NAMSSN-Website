import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, XCircle, Clock3, Search, Filter } from "lucide-react";
import { API_BASE } from "./api";

const dark = "bg-[#122F2B]";
const darkBorder = "border border-emerald-200/80";
const lightPanel = "bg-[#CFE7E0]";

function Pill({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition cursor-pointer",
        active
          ? "bg-[#0f2623] text-white border border-emerald-200/80"
          : "bg-white/10 text-white/85 border border-white/15 hover:bg-white/15",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function StatusBadge({ status }) {
  const map = {
    New: "bg-emerald-100 text-emerald-900 border-emerald-200",
    Open: "bg-amber-100 text-amber-900 border-amber-200",
    Resolved: "bg-blue-100 text-blue-900 border-blue-200",
    Rejected: "bg-red-100 text-red-900 border-red-200",
    Closed: "bg-slate-200 text-slate-900 border-slate-300",
  };

  return (
    <span className={`inline-flex items-center rounded px-2 py-1 text-xs font-bold border ${map[status]}`}>
      {status}
    </span>
  );
}

export default function AdminComplaints() {
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [query, setQuery] = useState("");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH COMPLAINTS
  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin/list_complaints.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          status,
          type,
          q: query,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.status !== "success")
        throw new Error(data.message || "Failed");

      setTickets(data.data || []);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [status, type, query]);

  // 🔥 UPDATE STATUS
  const updateStatus = async (ref_id, newStatus) => {
    try {
      const res = await fetch(`${API_BASE}/admin/update_complaint_status.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ref_id, status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok || data.status !== "success")
        throw new Error(data.message || "Failed");

      fetchComplaints();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white px-6 py-6">
      {/* FILTER BAR */}
      <div className={`${dark} ${darkBorder} rounded-md p-5 text-white`}>
        <h2 className="text-2xl font-bold uppercase">Ticket Inbox</h2>

        <div className="mt-4 flex flex-wrap gap-4">
          {["New", "Open", "Resolved", "Rejected", "Closed"].map((s) => (
            <Pill key={s} active={status === s} onClick={() => setStatus(s)}>
              {s === "New" && <Clock3 size={14} />}
              {s === "Open" && <XCircle size={14} />}
              {s === "Closed" && <CheckCircle2 size={14} />}
              {s}
            </Pill>
          ))}
        </div>

        <div className="mt-4 flex gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tickets..."
            className="rounded-md bg-white/10 border border-white/15 px-3 py-2 text-sm text-white placeholder:text-white/70"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="mt-6 border border-emerald-200/80 rounded-md overflow-hidden">
        <table className="w-full">
          <thead className={`${dark} text-white`}>
            <tr>
              <th className="p-3">Ref ID</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Student</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : tickets.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  No complaints found.
                </td>
              </tr>
            ) : (
              tickets.map((t) => (
                <tr key={t.ref_id} className="border-t">
                  <td className="p-3">{t.ref_id}</td>
                  <td className="p-3">{t.subject}</td>
                  <td className="p-3">{t.student_name}</td>
                  <td className="p-3">
                    {new Date(t.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => updateStatus(t.ref_id, "Resolved")}
                      className="bg-green-100 px-3 py-1 rounded font-bold text-green-800"
                    >
                      Resolve
                    </button>
                    <button
                      onClick={() => updateStatus(t.ref_id, "Rejected")}
                      className="bg-red-100 px-3 py-1 rounded font-bold text-red-800"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}