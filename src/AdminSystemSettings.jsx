import React, { useMemo, useState } from "react";
import { Settings, Shield, Bell, Wrench, Save, RefreshCw, AlertTriangle } from "lucide-react";

// ✅ same styling system from your Admin pages
const dark = "bg-[#122F2B]";
const darkBorder = "border border-emerald-200/80";
const lightPanel = "bg-[#CFE7E0]";

function SectionTitle({ children }) {
  return (
    <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide sm:tracking-widest text-[#0b0b0b] uppercase mb-3">
      {children}
    </h2>
  );
}

function SoftCard({ children }) {
  return (
    <div className="rounded-md border border-emerald-200/80 bg-white shadow-sm">
      {children}
    </div>
  );
}

function DarkCard({ children }) {
  return <div className={`${dark} ${darkBorder} rounded-md shadow-sm`}>{children}</div>;
}

function FieldLabel({ children }) {
  return <label className="block text-sm font-extrabold text-[#122F2B] mb-1">{children}</label>;
}

function Input({ ...props }) {
  return (
    <input
      {...props}
      className="w-full rounded-md bg-white border border-emerald-200/80 px-3 py-2 text-sm text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-200/60"
    />
  );
}

function Select({ children, ...props }) {
  return (
    <select
      {...props}
      className="w-full rounded-md bg-white border border-emerald-200/80 px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-emerald-200/60"
    >
      {children}
    </select>
  );
}

function Toggle({ checked, onChange, label, hint }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-extrabold text-[#122F2B]">{label}</p>
        {hint ? <p className="text-xs text-[#122F2B]/70 mt-0.5">{hint}</p> : null}
      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={[
          "relative inline-flex h-6 w-11 items-center rounded-full transition",
          checked ? "bg-emerald-500" : "bg-slate-300",
        ].join(" ")}
        aria-pressed={checked}
      >
        <span
          className={[
            "inline-block h-5 w-5 transform rounded-full bg-white shadow transition",
            checked ? "translate-x-5" : "translate-x-1",
          ].join(" ")}
        />
      </button>
    </div>
  );
}

export default function AdminSystemSettings() {
  // ✅ Mock state (replace with API later)
  const [form, setForm] = useState({
    portalName: "NAMSSN Result Portal",
    sessionTimeout: 30, // minutes
    maintenanceMode: false,

    minPasswordLength: 8,
    requireSpecialChar: true,
    enableTwoFA: false,
    maxLoginAttempts: 5,

    emailAlerts: true,
    complaintAlerts: true,
    announcementAlerts: true,

    currentSession: "2025/2026",
    currentSemester: "First Semester",
    resultsVisibleToStudents: true,
  });

  const update = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const canSave = useMemo(() => {
    const okName = String(form.portalName || "").trim().length >= 3;
    const okTimeout = Number(form.sessionTimeout) >= 5 && Number(form.sessionTimeout) <= 240;
    const okPwd = Number(form.minPasswordLength) >= 6 && Number(form.minPasswordLength) <= 30;
    const okAttempts = Number(form.maxLoginAttempts) >= 3 && Number(form.maxLoginAttempts) <= 20;
    return okName && okTimeout && okPwd && okAttempts;
  }, [form]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!canSave) return;
    alert("Settings saved (mock). Connect your API later.");
  };

  const handleReset = () => {
    if (!confirm("Reset settings to default? (mock)")) return;
    setForm({
      portalName: "NAMSSN Result Portal",
      sessionTimeout: 30,
      maintenanceMode: false,

      minPasswordLength: 8,
      requireSpecialChar: true,
      enableTwoFA: false,
      maxLoginAttempts: 5,

      emailAlerts: true,
      complaintAlerts: true,
      announcementAlerts: true,

      currentSession: "2025/2026",
      currentSemester: "First Semester",
      resultsVisibleToStudents: true,
    });
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="px-3 md:px-6 py-5 sm:py-6">
        {/* Top banner */}
        <DarkCard>
          <div className="p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <Settings className="text-emerald-200 mt-1" />
              <div className="min-w-0">
                <p className="text-white md:text-2xl text-xl font-extrabold tracking-widest uppercase">
                  Configure Portal Settings
                </p>
                <p className="text-white/80 text-base sm:text-lg mt-1">
                  Manage general options, security policy, notifications, and result visibility.
                </p>
              </div>
            </div>
          </div>
        </DarkCard>

        <form onSubmit={handleSave} className="mt-5 space-y-5">
          {/* GENERAL */}
          <SoftCard>
            <div className={`${lightPanel} rounded-t-md px-4 sm:px-5 py-4 border-b border-emerald-200/80`}>
              <div className="flex items-center gap-2 font-extrabold text-[#0b0b0b]">
                <Wrench size={18} /> GENERAL
              </div>
            </div>

            <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FieldLabel>Portal Name</FieldLabel>
                <Input
                  value={form.portalName}
                  onChange={(e) => update("portalName", e.target.value)}
                  placeholder="e.g. NAMSSN Result Portal"
                />
                <p className="text-xs text-[#122F2B]/70 mt-1">Shown on admin dashboard and login page.</p>
              </div>

              <div>
                <FieldLabel>Session Timeout (minutes)</FieldLabel>
                <Input
                  type="number"
                  min={5}
                  max={240}
                  value={form.sessionTimeout}
                  onChange={(e) => update("sessionTimeout", Number(e.target.value))}
                />
                <p className="text-xs text-[#122F2B]/70 mt-1">Auto logout after inactivity.</p>
              </div>

              <div className="md:col-span-2">
                <Toggle
                  checked={form.maintenanceMode}
                  onChange={(v) => update("maintenanceMode", v)}
                  label="Maintenance Mode"
                  hint="If ON, students cannot access the portal (admin only)."
                />
              </div>
            </div>
          </SoftCard>

          {/* SECURITY */}
          <SoftCard>
            <div className={`${lightPanel} rounded-t-md px-4 sm:px-5 py-4 border-b border-emerald-200/80`}>
              <div className="flex items-center gap-2 font-extrabold text-[#0b0b0b]">
                <Shield size={18} /> SECURITY
              </div>
            </div>

            <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FieldLabel>Minimum Password Length</FieldLabel>
                <Input
                  type="number"
                  min={6}
                  max={30}
                  value={form.minPasswordLength}
                  onChange={(e) => update("minPasswordLength", Number(e.target.value))}
                />
              </div>

              <div>
                <FieldLabel>Max Login Attempts</FieldLabel>
                <Input
                  type="number"
                  min={3}
                  max={20}
                  value={form.maxLoginAttempts}
                  onChange={(e) => update("maxLoginAttempts", Number(e.target.value))}
                />
                <p className="text-xs text-[#122F2B]/70 mt-1">Lock account temporarily after too many attempts.</p>
              </div>

              <div className="md:col-span-2 space-y-3">
                <Toggle
                  checked={form.requireSpecialChar}
                  onChange={(v) => update("requireSpecialChar", v)}
                  label="Require Special Characters"
                  hint="For stronger passwords."
                />
                <Toggle
                  checked={form.enableTwoFA}
                  onChange={(v) => update("enableTwoFA", v)}
                  label="Enable 2FA (Admin)"
                  hint="Extra protection for admin accounts (UI only for now)."
                />
              </div>
            </div>
          </SoftCard>

          {/* NOTIFICATIONS */}
          <SoftCard>
            <div className={`${lightPanel} rounded-t-md px-4 sm:px-5 py-4 border-b border-emerald-200/80`}>
              <div className="flex items-center gap-2 font-extrabold text-[#0b0b0b]">
                <Bell size={18} /> NOTIFICATIONS
              </div>
            </div>

            <div className="p-4 sm:p-5 space-y-3">
              <Toggle
                checked={form.emailAlerts}
                onChange={(v) => update("emailAlerts", v)}
                label="Email Alerts"
                hint="Send system alerts to admin email."
              />
              <Toggle
                checked={form.complaintAlerts}
                onChange={(v) => update("complaintAlerts", v)}
                label="Complaint Alerts"
                hint="Notify admin when a new ticket is created."
              />
              <Toggle
                checked={form.announcementAlerts}
                onChange={(v) => update("announcementAlerts", v)}
                label="Announcement Alerts"
                hint="Notify admins when a lecturer posts an announcement."
              />
            </div>
          </SoftCard>

          {/* ACADEMIC / PORTAL */}
          <SoftCard>
            <div className={`${lightPanel} rounded-t-md px-4 sm:px-5 py-4 border-b border-emerald-200/80`}>
              <div className="flex items-center gap-2 font-extrabold text-[#0b0b0b]">
                <Settings size={18} /> PORTAL / ACADEMIC
              </div>
            </div>

            <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FieldLabel>Current Session</FieldLabel>
                <Input
                  value={form.currentSession}
                  onChange={(e) => update("currentSession", e.target.value)}
                  placeholder="e.g. 2025/2026"
                />
              </div>

              <div>
                <FieldLabel>Current Semester</FieldLabel>
                <Select
                  value={form.currentSemester}
                  onChange={(e) => update("currentSemester", e.target.value)}
                >
                  <option>First Semester</option>
                  <option>Second Semester</option>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Toggle
                  checked={form.resultsVisibleToStudents}
                  onChange={(v) => update("resultsVisibleToStudents", v)}
                  label="Results Visible To Students"
                  hint="Turn OFF to hide results temporarily."
                />
              </div>
            </div>
          </SoftCard>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={!canSave}
              className={[
                "w-full sm:w-auto rounded-md px-5 py-3 font-extrabold transition active:scale-[0.99] inline-flex items-center justify-center gap-2",
                canSave
                  ? `${lightPanel} text-[#122F2B] hover:brightness-95 cursor-pointer`
                  : "bg-slate-200 text-slate-500 cursor-not-allowed",
              ].join(" ")}
            >
              <Save size={18} /> Save Changes
            </button>

            <button
              type="button"
              onClick={handleReset}
              className={`w-full sm:w-auto rounded-md px-5 py-3 font-extrabold ${dark} ${darkBorder} text-white hover:brightness-110 active:scale-[0.99] transition inline-flex items-center justify-center gap-2`}
            >
              <RefreshCw size={18} /> Reset
            </button>
          </div>

          {/* DANGER ZONE */}
          <SoftCard>
            <div className="rounded-t-md px-4 sm:px-5 py-4 border-b border-emerald-200/80 bg-red-50">
              <div className="flex items-center gap-2 font-extrabold text-red-700">
                <AlertTriangle size={18} /> DANGER ZONE
              </div>
            </div>

            <div className="p-4 sm:p-5">
              <p className="text-sm text-[#122F2B] font-semibold">
                These actions are irreversible (mock buttons for now).
              </p>

              <div className="mt-3 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => alert("Clear cache (mock)")}
                  className="rounded-md px-4 py-3 font-extrabold bg-white border border-red-200 text-red-700 hover:bg-red-50 active:scale-[0.99] transition"
                >
                  Clear Cache
                </button>

                <button
                  type="button"
                  onClick={() => alert("Reset database settings (mock)")}
                  className="rounded-md px-4 py-3 font-extrabold bg-red-600 text-white hover:brightness-95 active:scale-[0.99] transition"
                >
                  Reset Settings
                </button>
              </div>
            </div>
          </SoftCard>
        </form>

        <div className="h-6" />
      </div>
    </div>
  );
}