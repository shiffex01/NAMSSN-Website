import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "./api"; 

const STORAGE_KEY = "student_profile_data";

const emptyProfile = {
  name: "",
  email: "",
  phone: "",
  state: "",
  residential_addy: "",
  dob: "",
  gender: "",
  nation: "",
  e_phone: "",
  relation: "",
  emg_cnt: ""
};

export default function EditProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyProfile);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  // Load mock profile on mount
  useEffect(() => {
    setError("");
    setMsg("");

    const loginStudentRaw = localStorage.getItem("loggedInStudent");
    const storedProfileRaw = localStorage.getItem(STORAGE_KEY);

    let base = { ...emptyProfile };

    try {
      if (loginStudentRaw) {
        const loginStudent = JSON.parse(loginStudentRaw);
        base = {
          ...base,
          name: loginStudent.name ?? loginStudent.full_name ?? "",
          email: loginStudent.email ?? "",
        };
      }
    } catch {}

    try {
      if (storedProfileRaw) {
        const stored = JSON.parse(storedProfileRaw);
        base = { ...base, ...stored };
      }
    } catch {}

    setForm(base);
  }, []);

  const isValidEmail = useMemo(() => {
    if (!form.email) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  }, [form.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    if (!form.name.trim()) return setError("Name is required.");
    if (!isValidEmail) return setError("Please enter a valid email.");

    setSaving(true);

    try {
      const payload = {
      ...form,
      location: form.residential_addy,
      sex: form.gender,
    };
      const res = await fetch(`${API_BASE}/update_student_profile.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      }
      
    );

      const text = await res.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        console.log("RAW RESPONSE:", text);
        setError("Backend did not return JSON.");
        return;
      }

      if (res.status === 401) {
        setError("Session expired. Please login again.");
        return;
      }

      if (data.status !== "success") {
        setError(data.message || "Failed to update profile.");
        return;
      }

      // Optional: keep localStorage in sync for UI only
      const loginStudentRaw = localStorage.getItem("loggedInStudent");
      let loginStudent = {};
      try {
        loginStudent = loginStudentRaw ? JSON.parse(loginStudentRaw) : {};
      } catch {}

      const mergedLoginStudent = {
        ...loginStudent,
        name: data.data?.student?.name ?? form.name,
        full_name: data.data?.student?.name ?? form.name,
        email: data.data?.student?.email ?? form.email,
      };

      localStorage.setItem("loggedInStudent", JSON.stringify(mergedLoginStudent));

      setMsg("Profile updated successfully.");
    } catch (err) {
      console.error(err);
      setError("Could not save profile. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleResetMock = () => {
    localStorage.removeItem(STORAGE_KEY);
    setMsg("Mock profile cleared. Reloading…");
    setTimeout(() => window.location.reload(), 400);
  };

  return (
    <div className="default">
      <div className="flex items-center justify-between mb-4">
        <h1 className="head1">EDIT PROFILE</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-green-700 hover:bg-green-600 text-white text-sm px-4 py-2 rounded"
        >
          Back
        </button>
      </div>

      <div className="bg-white rounded-xl p-6 border border-green-200">
        <p className="text-sm text-gray-600 mb-4">
          Edit your personal information
        </p>

        {error && (
          <div className="mb-4 text-sm font-semibold text-red-700 bg-red-50 border border-red-200 p-3 rounded">
            {error}
          </div>
        )}
        {msg && (
          <div className="mb-4 text-sm font-semibold text-green-800 bg-green-50 border border-green-200 p-3 rounded">
            {msg}
          </div>
        )}

        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="inputClass"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="inputClass"
              placeholder="080..."
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Address</label>
            <input
              name="residential_addy"
              value={form.residential_addy}
              onChange={handleChange}
              className="inputClass"
              placeholder="Zaria..."
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="inputClass"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="inputClass"
            >
              <option value="">Select</option>
              <option>Female</option>
              <option>Male</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Nationality</label>
            <input
              name="nation"
              value={form.nation}
              onChange={handleChange}
              className="inputClass"
              placeholder="Nigeria"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Emergency Contact Name</label>
            <input
              name="emg_cnt"
              value={form.emg_cnt}
              onChange={handleChange}
              className="inputClass"
              placeholder="Full name"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Emergency Phone</label>
            <input
              name="e_phone"
              value={form.e_phone}
              onChange={handleChange}
              className="inputClass"
              placeholder="080..."
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Relation</label>
            <input
              name="relation"
              value={form.relation}
              onChange={handleChange}
              className="inputClass"
              placeholder="Mother / Father / Guardian"
            />
          </div>

          <div className="md:col-span-2 flex flex-col md:flex-row gap-3 mt-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-green-800 hover:bg-green-900 disabled:opacity-60 text-white px-6 py-2 rounded"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={handleResetMock}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded border"
            >
              Clear Mock Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
