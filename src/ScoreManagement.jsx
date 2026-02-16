import React, { useMemo, useState } from "react";
import { UploadCloud } from "lucide-react";
import { Link } from "react-router-dom";


const dark = "bg-[#122F2B]";
const darkBorder = "border border-emerald-200/80";

const coursesSeed = [
  { code: "MTH301", title: "Mathematical Method II", review: "Review/Edit" },
  { code: "MTH303", title: "Advanced Real Analysis I", review: "Review/Edit" },
  { code: "MTH305", title: "Advanced Real Analysis II", review: "Review/Edit" },
  { code: "MTH307", title: "Theory of Ring and Fields", review: "Review/Edit" },
  { code: "MTH309", title: "Complex Analysis", review: "Review/Edit" },
];

function SectionTitle({ children }) {
  return (
    <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide sm:tracking-widest text-[#0b0b0b] uppercase mb-3">
      {children}
    </h2>
  );
}

function Label({ children }) {
  return (
    <label className="block text-sm sm:text-base font-semibold text-white/90 mb-1">
      {children}
    </label>
  );
}

function Select({ value, onChange, options, placeholder }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded border border-emerald-200/70 bg-white px-3 py-2 text-sm sm:text-base text-[#0b0b0b] outline-none focus:ring-2 focus:ring-emerald-200"
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

function TextInput({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded border border-emerald-200/70 bg-white px-3 py-2 text-sm sm:text-base text-[#0b0b0b] outline-none focus:ring-2 focus:ring-emerald-200"
    />
  );
}

function MintButton({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`rounded bg-[#CFE7E0] px-4 py-2 text-sm sm:text-base font-extrabold text-[#122F2B] hover:brightness-95 active:scale-[0.99] transition cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}

function DarkButton({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`rounded ${dark} ${darkBorder} px-4 py-2 text-sm sm:text-base font-extrabold text-white hover:brightness-110 active:scale-[0.99] transition cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}

function Panel({ children }) {
  return <div className={`${dark} ${darkBorder} rounded-md shadow-sm`}>{children}</div>;
}

export default function ScoreManagement() {
  // Upload Scores state (UI only)
  const [selectCourse, setSelectCourse] = useState("");
  const [selectSemester, setSelectSemester] = useState("");
  const [selectLevel, setSelectLevel] = useState("");
  const [fileName, setFileName] = useState("");

  
  const [filter, setFilter] = useState("");
  const [reviewCourse, setReviewCourse] = useState("Course");

  // Publish state
  const [pubCourse, setPubCourse] = useState("");
  const [pubSemester, setPubSemester] = useState("");
  const [pubLevel, setPubLevel] = useState("");
  const [confirmChecked, setConfirmChecked] = useState(false);

  const courses = useMemo(() => coursesSeed, []);

  const filteredCourses = useMemo(() => {
    const f = filter.trim().toLowerCase();
    return courses.filter((c) => {
      const matchesText =
        !f ||
        c.code.toLowerCase().includes(f) ||
        c.title.toLowerCase().includes(f);
      const matchesCourse = reviewCourse === "Course" || reviewCourse === "" ? true : c.code === reviewCourse;
      return matchesText && matchesCourse;
    });
  }, [courses, filter, reviewCourse]);

  return (
    <div className="min-h-screen w-full bg-white overflow-y-auto">

      <div className="px-3 sm:px-6 lg:px-10 py-5 sm:py-6">
        {/* Upload Scores */}
        <SectionTitle>Upload Scores</SectionTitle>

        <div className="rounded-md border border-emerald-200/80 p-3 sm:p-4">
          <Panel>
            <div className="p-4 sm:p-6 md:p-7">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Left: form */}
                <div className="lg:col-span-2 space-y-3">
                  <div>
                    <Label>Select Course</Label>
                    <Select
                      value={selectCourse}
                      onChange={setSelectCourse}
                      placeholder="Select course"
                      options={["MTH301", "MTH303", "MTH305", "MTH307", "MTH309"]}
                    />
                  </div>

                  <div>
                    <Label>Select Semester</Label>
                    <Select
                      value={selectSemester}
                      onChange={setSelectSemester}
                      placeholder="Select semester"
                      options={["First", "Second"]}
                    />
                  </div>

                  <div>
                    <Label>Select Level</Label>
                    <Select
                      value={selectLevel}
                      onChange={setSelectLevel}
                      placeholder="Select level"
                      options={["100", "200", "300", "400", "500"]}
                    />
                  </div>

                  <div>
                    <Label>Upload File(s)</Label>
                    <div className="rounded border border-emerald-200/70 bg-white p-3">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <label className="inline-flex items-center justify-center gap-2 rounded bg-[#CFE7E0] px-4 py-2 text-sm sm:text-base font-extrabold text-[#122F2B] cursor-pointer hover:brightness-95 transition">
                          <UploadCloud size={18} />
                          Choose file
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              setFileName(f ? f.name : "");
                            }}
                          />
                        </label>

                        <div className="text-sm sm:text-base text-[#0b0b0b]/80 truncate">
                          {fileName ? fileName : "No file chosen"}
                        </div>
                      </div>

                      <p className="mt-2 text-xs sm:text-sm text-[#0b0b0b]/60">
                        Files allowed: Excel (.xlsx) or CSV. (You can validate on backend later.)
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <DarkButton type="button">Save as draft</DarkButton>
                    <DarkButton type="button">Delete</DarkButton>
                  </div>
                </div>

                {/* Right: help box */}
                <div className="lg:col-span-1">
                  <div className="rounded-md border border-emerald-200/70 bg-white p-4">
                    <p className="text-sm sm:text-base font-bold text-[#0b0b0b]">
                      Need a guide?
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-[#0b0b0b]/70">
                      Click the button below to download a sample template and upload your scores in the correct format.
                    </p>
                    <div className="mt-3">
                      <MintButton type="button" className="w-full">
                        Download template
                      </MintButton>
                    </div>
                    <div className="mt-3">
                      <DarkButton type="button" className="w-full">
                        Upload Score
                      </DarkButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Panel>
        </div>

        {/* Score Review and Edit */}
        <div className="mt-6">
          <SectionTitle>Score Review and Edit</SectionTitle>

          <div className="rounded-md border border-emerald-200/80 p-3 sm:p-4">
            <div className="flex flex-col md:flex-row gap-3 md:items-center mb-3">
              <div className="w-full md:w-1/2">
                <TextInput
                  value={filter}
                  onChange={setFilter}
                  placeholder="Filter by course"
                />
              </div>

              <div className="w-full md:w-1/2">
                <Select
                  value={reviewCourse}
                  onChange={setReviewCourse}
                  placeholder="Course"
                  options={["Course", "MTH301", "MTH303", "MTH305", "MTH307", "MTH309"]}
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-md border border-emerald-200/80">
              <table className="min-w-full bg-white">
                <thead className="bg-[#122F2B] text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-extrabold">
                      Course Code
                    </th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-extrabold">
                      Course Title
                    </th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-extrabold">
                      Review
                    </th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-extrabold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((c) => (
                    <tr key={c.code} className="border-t border-emerald-200/70">
                      <td className="px-4 py-3 text-sm sm:text-base font-semibold text-[#0b0b0b]">
                        {c.code}
                      </td>
                      <td className="px-4 py-3 text-sm sm:text-base text-[#0b0b0b]/80">
                        {c.title}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          to={`/admin/review/${c.code}`}
                          className="text-sm sm:text-base font-bold text-emerald-800 hover:underline"
                        >
                          {c.review}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          className="text-sm sm:text-base font-bold text-red-600 hover:underline"
                          onClick={() => alert(`Delete ${c.code} (hook backend later)`)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredCourses.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-6 text-center text-sm sm:text-base text-[#0b0b0b]/60"
                      >
                        No courses found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Publishing Control */}
        <div className="mt-6">
          <SectionTitle>Publishing Control</SectionTitle>

          <div className="rounded-md border border-emerald-200/80 p-3 sm:p-4">
            <Panel>
              <div className="p-4 sm:p-6 md:p-7 space-y-3">
                <div>
                  <Label>Select Course</Label>
                  <Select
                    value={pubCourse}
                    onChange={setPubCourse}
                    placeholder="Select course"
                    options={["MTH301", "MTH303", "MTH305", "MTH307", "MTH309"]}
                  />
                </div>

                <div>
                  <Label>Select Semester</Label>
                  <Select
                    value={pubSemester}
                    onChange={setPubSemester}
                    placeholder="Select semester"
                    options={["First", "Second"]}
                  />
                </div>

                <div>
                  <Label>Select Level</Label>
                  <Select
                    value={pubLevel}
                    onChange={setPubLevel}
                    placeholder="Select level"
                    options={["100", "200", "300", "400", "500"]}
                  />
                </div>

                <div className="mt-2 rounded bg-[#CFE7E0] px-4 py-2 text-center text-sm sm:text-base font-extrabold text-[#122F2B]">
                  Publish All Pending
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input
                    id="confirm"
                    type="checkbox"
                    checked={confirmChecked}
                    onChange={(e) => setConfirmChecked(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-emerald-700"
                  />
                  <label htmlFor="confirm" className="text-sm sm:text-base text-white/85">
                    Are you sure you want to publish all pending?
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    disabled={!confirmChecked}
                    className={`w-full rounded px-4 py-3 text-sm sm:text-base font-extrabold tracking-wide transition ${
                      confirmChecked
                        ? "bg-[#CFE7E0] text-[#122F2B] hover:brightness-95 cursor-pointer"
                        : "bg-white/20 text-white/60 cursor-not-allowed"
                    }`}
                    onClick={() => alert("Confirm Publish (connect backend later)")}
                  >
                    Confirm Publish
                  </button>
                </div>
              </div>
            </Panel>
          </div>
        </div>

        <div className="h-6" />
      </div>
    </div>
  );
}
