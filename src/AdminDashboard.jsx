import React from "react";
import { Bell, BarChart3, Upload } from "lucide-react";
import { Link } from "react-router-dom";

const dark = "bg-[#122F2B]";
const darkBorder = "border border-emerald-200/80";

function SectionTitle({ children }) {
  return (
    <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide sm:tracking-widest text-[#0b0b0b] uppercase mb-2">
      {children}
    </h2>
  );
}

function TaskCard({ title, value, buttonText, icon, to = "#" }) {
  return (
    <div className={`${dark} ${darkBorder} rounded-md shadow-sm`}>
      <div className="p-4 sm:p-6 md:p-7">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-base sm:text-lg font-semibold text-white/90 truncate">
              {title}
            </p>
            <p className="mt-3 text-3xl sm:text-4xl md:text-4xl font-extrabold leading-none text-white">
              {value}
            </p>
          </div>

          <div className="mt-1 text-white/90 flex-shrink-0">
            {/* scale icon a bit on bigger screens */}
            <span className="hidden sm:inline">{icon}</span>
            <span className="sm:hidden">
              {React.cloneElement(icon, { size: 16 })}
            </span>
          </div>
        </div>

        <div className="mt-4 sm:mt-5">
          <Link to={to}>
            <button
              type="button"
              className="w-full rounded bg-[#CFE7E0] px-4 py-2 text-base sm:text-lg font-bold text-[#122F2B] hover:brightness-95 active:scale-[0.99] transition cursor-pointer"
            >
              {buttonText}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function HealthCard({ title, value }) {
  return (
    <div className={`${dark} ${darkBorder} rounded-md shadow-sm`}>
      <div className="p-4 sm:p-6 md:p-7">
        <p className="text-base sm:text-lg font-semibold text-white/90 truncate">
          {title}
        </p>
        <p className="mt-3 text-3xl sm:text-4xl font-extrabold leading-none text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

function Panel({ children }) {
  return (
    <div className={`${dark} ${darkBorder} rounded-md shadow-sm`}>{children}</div>
  );
}

export default function AdminDashboard() {
  const stats = {
    tickets: 15,
    verification: 8,
    unpublished: 32,
    students: "150+",
    lecturers: "10+",
  };

  return (
    // make it scroll-friendly too
    <div className="min-h-screen w-full bg-white overflow-y-auto">
      <div className="px-3 sm:px-6 lg:px-10 py-5 sm:py-6">
        {/* Pending Tasks */}
        <SectionTitle>PENDING TASKS</SectionTitle>

        <div className="rounded-md border border-emerald-200/80 p-3 sm:p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <TaskCard
              title="New Complaint Tickets"
              value={stats.tickets}
              buttonText="View Tickets"
              icon={<Bell size={18} />}
              to="/admin/complaints"
            />
            <TaskCard
              title="Verification Requests"
              value={stats.verification}
              buttonText="View Tickets"
              icon={<BarChart3 size={18} />}
              to="/admin/verification"
            />
            <TaskCard
              title="Unpublished Results"
              value={stats.unpublished}
              buttonText="Go to Results"
              icon={<Upload size={18} />}
              to="/admin/results"
            />
          </div>
        </div>

        {/* System Health */}
        <div className="mt-5 sm:mt-6">
          <SectionTitle>SYSTEM HEALTH</SectionTitle>

          <div className="rounded-md border border-emerald-200/80 p-3 sm:p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <HealthCard title="Total Students" value={stats.students} />
              <HealthCard title="Total Lecturers" value={stats.lecturers} />
            </div>

            <div className="mt-3 sm:mt-4">
              <Panel>
                <div className="p-4 sm:p-5">
                  <p className="text-base sm:text-lg font-semibold text-white/90">
                    Latest System Activity
                  </p>

                  <ul className="mt-3 space-y-2 text-sm sm:text-base text-white/85">
                    <li className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/70 flex-shrink-0" />
                      <span className="min-w-0">
                        Lecturer A uploaded math111 results
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/70 flex-shrink-0" />
                      <span className="min-w-0">System update complete</span>
                    </li>
                  </ul>
                </div>
              </Panel>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-5 sm:mt-6">
          <SectionTitle>QUICK ACTIONS</SectionTitle>

          <div className="rounded-md border border-emerald-200/80 p-3 sm:p-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link to="/admin/upload-results">
                <button
                  className={`w-full ${dark} ${darkBorder} rounded-md px-4 py-4 sm:py-6 text-base sm:text-lg cursor-pointer font-extrabold tracking-wide text-white hover:brightness-110 active:scale-[0.99] transition`}
                >
                  UPLOAD NEW RESULT BATCH
                </button>
              </Link>

              <Link to="/admin/search-student">
                <button
                  className={`w-full ${dark} ${darkBorder} rounded-md px-4 py-4 sm:py-6 text-base sm:text-lg cursor-pointer font-extrabold tracking-wide text-white hover:brightness-110 active:scale-[0.99] transition`}
                >
                  SEARCH STUDENT
                </button>
              </Link>

              <Link to="/admin/complaints">
                <button
                  className={`w-full ${dark} ${darkBorder} rounded-md px-4 py-4 sm:py-6 text-base sm:text-lg cursor-pointer font-extrabold tracking-wide text-white hover:brightness-110 active:scale-[0.99] transition`}
                >
                  STUDENTS WITH MOST COMPLAINTS
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="h-6" />
      </div>
    </div>
  );
}
