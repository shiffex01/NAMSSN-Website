import { useState, useEffect } from "react";

export default function Complaints() {
  const [formData, setFormData] = useState({
    complaintType: "",
    course: "",
    subject: "",
    description: "",
    evidence: null,
  });

  const [complaints, setComplaints] = useState([]);

  // Generate random ID
  const generateId = () => {
    return "MTS-" + Math.floor(1000 + Math.random() * 9000);
  };


  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Load complaints on mount
    useEffect(() => {
      const savedComplaints = localStorage.getItem("complaints");
      if (savedComplaints) {
        try {
          setComplaints(JSON.parse(savedComplaints));
        } catch {
          localStorage.removeItem("complaints"); // clear bad data
        }
      }
    }, []);

// Save complaints when they change
useEffect(() => {
  if (complaints.length > 0) {
    localStorage.setItem("complaints", JSON.stringify(complaints));
  }
}, [complaints]);

// Handle submit
const handleSubmit = (e) => {
  e.preventDefault();

  const newComplaint = {
    id: generateId(),
    ...formData,
    date: new Date().toLocaleDateString(),
    status: "Under Review",
  };

  setComplaints((prev) => {
    const updated = [...prev, newComplaint];
    localStorage.setItem("complaints", JSON.stringify(updated)); // manual save
    return updated;
  });

  // Reset form
  setFormData({
    complaintType: "",
    course: "",
    subject: "",
    description: "",
    evidence: null,
  });
};


  // ===================== STATUS COUNTS =====================
  const statusCounts = {
    underReview: complaints.filter((c) => c.status === "Under Review").length,
    closed: complaints.filter((c) => c.status === "Closed").length,
    resolved: complaints.filter((c) => c.status === "Resolved").length,
    rejected: complaints.filter((c) => c.status === "Rejected").length,
  };

  // ===================== RENDER =====================
  return (
    <div className="min-h-screen md:p-6">
      <h1 className="head1 mb-4">COMPLAINTS</h1>

      <div className="bg-[#0b3b0b] rounded min-h-screen md:p-6 p-4">
        <h2 className="md:text-2xl text-xl font-bold mb-2 md:mb-4">
          Submit a Complaint
        </h2>

        {/* ================= FORM ================= */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#041b04] p-2 md:p-6 rounded-lg shadow-md space-y-6"
        >
          <div>
            <label className="block font-semibold mb-1">Complaint Type</label>
            <input
              type="text"
              name="complaintType"
              value={formData.complaintType}
              onChange={handleChange}
              placeholder="E.g. Missing score, Result verification..."
              className="w-full p-3 rounded-md bg-[#0b3b0b] text-gray-100 border border-green-900 focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Related Course</label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="Enter course title"
                className="w-full p-3 rounded-md bg-[#0b3b0b] text-gray-100 border border-green-900 focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Subject/Title</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="E.g. Request for update..."
                className="w-full p-3 rounded-md bg-[#0b3b0b] text-gray-100 border border-green-900 focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Type here"
              maxLength={300}
              className="w-full h-40 p-3 rounded-md bg-[#0b3b0b] text-gray-100 border border-green-900 focus:ring-2 focus:ring-green-500"
            ></textarea>
            <p className="text-right text-xs text-gray-400">
              No more than 300 words
            </p>
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Upload Evidence (Optional)
            </label>
            <input
              type="file"
              name="evidence"
              onChange={handleChange}
              accept="image/*"
              className="flex-1 p-2 rounded-md bg-[#0b3b0b] border border-green-900 text-gray-300"
            />
          </div>

          <button
            type="submit"
            className="bg-white text-green-800 font-bold px-6 py-3 rounded-md hover:bg-green-100"
          >
            SUBMIT COMPLAINT
          </button>
        </form>

        {/* ================= HISTORY TABLE ================= */}
        <h2 className="md:text-2xl text-xl font-bold mb-2 mt-10 md:mt-20 md:mb-4">
          Complaints History
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden">
            <thead className="bg-[#041b04] text-white">
              <tr>
                <th className="p-2 table_right">Ref ID</th>
                <th className="p-2 table_right">Type</th>
                <th className="p-2 table_right">Related Course</th>
                <th className="p-2 table_right">Subject</th>
                <th className="p-2 table_right">Date</th>
                <th className="p-2 table_right">Status</th>
                <th className="p-2 table_right">Action</th>
              </tr>
            </thead>
            <tbody>
              {complaints.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="p-3 text-center text-gray-400 italic"
                  >
                    No complaints submitted yet.
                  </td>
                </tr>
              ) : (
                complaints.map((item) => (
                  <tr key={item.id} className="border-t border-gray-200">
                    <td className="p-2 table_right">{item.id}</td>
                    <td className="p-2 table_right">{item.complaintType}</td>
                    <td className="p-2 table_right">{item.course}</td>
                    <td className="p-2 table_right">{item.subject}</td>
                    <td className="p-2 table_right">{item.date}</td>
                    <td className="p-2 table_right">
                      {item.status || "Under Review"}
                    </td>
                    <td className="p-2 table_right text-green-700 font-bold cursor-pointer hover:underline">
                      View Thread
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ================= STATUS CARDS ================= */}
        <div className="grid md:grid-cols-4 gap-4 mt-10">
          <div className="card_status">
            <h3 className="head_card">Under Review</h3>
            <p className="text-3xl font-bold text-gray-950">
              {statusCounts.underReview}
            </p>
          </div>
          <div className="card_status">
            <h3 className="head_card">Resolved</h3>
            <p className="text-3xl font-bold text-blue-500">
              {statusCounts.resolved}
            </p>
          </div>
          <div className="card_status">
            <h3 className="head_card">Rejected</h3>
            <p className="text-3xl font-bold text-red-500">
              {statusCounts.rejected}
            </p>
          </div>
           <div className="card_status">
            <h3 className="head_card">Closed</h3>
            <p className="text-3xl font-bold text-orange-500">
              {statusCounts.closed}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
