import React, { useMemo, useState } from "react";

// ✅ same styling system from your AdminComplaints
const dark = "bg-[#122F2B]";
const darkBorder = "border border-emerald-200/80";
const lightPanel = "bg-[#CFE7E0]"; // your soft color

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

export default function AdminAnnouncements() {
  const MAX_WORDS = 3000;

  // ✅ mock announcements list
  const [announceList, setAnnounceList] = useState([
    { id: 1, title: "Title Goes Here", admin: "Lecturer One", date: "2026-02-09" },
    { id: 2, title: "Title Goes Here Title Goes H", admin: "Lecturer One", date: "2026-02-09" },
    { id: 3, title: "Title Goes Here Title Goes H", admin: "Lecturer One", date: "2026-02-09" },
    { id: 4, title: "Title Goes Here Title Goes H", admin: "Lecturer One", date: "2026-02-09" },
  ]);

  // ✅ form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [audience, setAudience] = useState({
    Lecturers: false,
    "100L": false,
    "200L": false,
    "300L": false,
    "400L": false,
    General: false,
  });

  const [file, setFile] = useState(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const selectedAudience = useMemo(
    () => Object.entries(audience).filter(([, v]) => v).map(([k]) => k),
    [audience]
  );

  const wordCount = useMemo(() => {
    const w = content.trim().split(/\s+/).filter(Boolean);
    return content.trim() ? w.length : 0;
  }, [content]);

  const isTooLong = wordCount > MAX_WORDS;

  const canPublish =
    title.trim() &&
    content.trim() &&
    name.trim() &&
    selectedAudience.length > 0 &&
    !isTooLong;

  const toggleAudience = (key) => {
    setAudience((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFile = (e) => {
    const f = e.target.files?.[0] || null;
    setFile(f);

    if (!f) {
      setFilePreviewUrl("");
      return;
    }

    // preview only for images (optional)
    if (f.type.startsWith("image/")) {
      const url = URL.createObjectURL(f);
      setFilePreviewUrl(url);
    } else {
      setFilePreviewUrl("");
    }
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (!canPublish) return;

    const newItem = {
      id: Date.now(),
      title: title.trim(),
      admin: name.trim(),
      date: new Date().toISOString().slice(0, 10),
      // you can store `content`, `audience`, `file` for API later
    };

    setAnnounceList((prev) => [newItem, ...prev]);
    setIsPreviewOpen(false);

    // reset
    setTitle("");
    setContent("");
    setName("");
    setAudience({
      Lecturers: false,
      "100L": false,
      "200L": false,
      "300L": false,
      "400L": false,
      General: false,
    });
    setFile(null);
    setFilePreviewUrl("");
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="px-3 md:px-6 py-5 sm:py-6">

        {/* ADD NEW ANNOUNCEMENTS */}
        <DarkCard>
          <div className="p-4 sm:p-5">
            <p className="text-white font-extrabold tracking-widest uppercase">
              Add New Announcement
            </p>

            {/* Inner bordered panel like screenshot */}
            <form
              onSubmit={handlePublish}
              className={`mt-3 ${darkBorder} rounded-md p-4 sm:p-5 bg-white/5`}
            >
              {/* Title */}
              <div className="mb-4">
                <label className="block text-white font-semibold mb-1">Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Announcement's Title"
                  className="w-full rounded-md bg-white border border-emerald-200/80 px-3 py-2 text-sm text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-200/60"
                />
              </div>

              {/* Content */}
              <div className="mb-4">
                <label className="block text-white font-semibold mb-1">Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your content here..."
                  rows={7}
                  className="w-full rounded-md bg-white border border-emerald-200/80 px-3 py-2 text-sm text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-200/60 resize-none"
                />
                <div className="flex justify-end mt-1">
                  <span className={`text-xs ${isTooLong ? "text-red-300" : "text-white/70"}`}>
                    No more than {MAX_WORDS} words
                  </span>
                </div>
              </div>

              {/* Name */}
              <div className="mb-4">
                <label className="block text-white font-semibold mb-1">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Let others know it's you"
                  className="w-full rounded-md bg-white border border-emerald-200/80 px-3 py-2 text-sm text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-200/60"
                />
              </div>

              {/* Audience */}
              <div className="mb-4">
                <p className="text-white font-semibold mb-2">Choose Visibility</p>
                <div className="flex flex-wrap gap-4 text-sm text-white">
                  {Object.keys(audience).map((key) => (
                    <label key={key} className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={audience[key]}
                        onChange={() => toggleAudience(key)}
                        className="h-4 w-4 accent-emerald-200 cursor-pointer"
                      />
                      <span>{key}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Attach */}
              <div className="mb-4">
                <label className="block text-white font-semibold mb-1">
                  Attach files (optional)
                </label>

                <div className="rounded-md bg-white border border-emerald-200/80 px-3 py-2 flex items-center gap-2">
                  <input
                    type="file"
                    onChange={handleFile}
                    accept="image/*,.pdf"
                    className="w-full text-sm text-black"
                  />
                </div>

                <div className="flex justify-end mt-1">
                  <span className="text-xs text-white/70">Files must contain jpg, pdf or png</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-5 flex items-center gap-3">
                <button
                  type="button"
                  className={`w-full rounded-md px-4 py-3 font-extrabold ${dark} ${darkBorder} text-white hover:brightness-110 active:scale-[0.99] transition`}
                  onClick={() => setIsPreviewOpen(true)}
                >
                  Preview
                </button>

                <button
                  type="submit"
                  disabled={!canPublish}
                  className={[
                    "w-full rounded-md px-4 py-3 font-extrabold transition active:scale-[0.99]",
                    canPublish
                      ? `${lightPanel} text-[#122F2B] hover:brightness-95 cursor-pointer`
                      : "bg-slate-200 text-slate-500 cursor-not-allowed",
                  ].join(" ")}
                >
                  Publish Announcement
                </button>
              </div>

              {/* Optional image preview (if they attach an image) */}
              {filePreviewUrl && (
                <div className="mt-5">
                  <img
                    src={filePreviewUrl}
                    alt="attachment preview"
                    className="w-full max-h-64 object-cover rounded-md border border-emerald-200/80"
                  />
                </div>
              )}

              {/* Wordcount error */}
              {isTooLong && (
                <p className="mt-3 text-sm text-red-300 font-semibold">
                  Your content is too long ({wordCount} words). Max is {MAX_WORDS}.
                </p>
              )}
            </form>
          </div>
        </DarkCard>

        {/* ALL ANNOUNCEMENTS */}
        <div className="mt-5">
          <DarkCard>
            <div className="p-4 sm:p-5">
              <p className="text-white font-extrabold tracking-widest uppercase">
                All Announcements
              </p>

              <SoftCard>
                <div className="p-4">
                  <ul className="space-y-2">
                    {announceList.map((a) => (
                      <li key={a.id} className="flex items-center gap-2">
                        {/* little green dot like screenshot */}
                        <span className="h-2 w-2 rounded-full bg-emerald-300" />

                        <p className="font-extrabold text-[#0b0b0b]">
                          {a.title}
                          <span className="ml-2 text-xs italic font-semibold text-red-600">
                            uploaded by {a.admin}
                          </span>
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </SoftCard>
            </div>
          </DarkCard>
        </div>

        {/* ✅ PREVIEW MODAL */}
{isPreviewOpen && (
  <div
    className="fixed inset-0 z-[999] flex items-center justify-center px-3"
    role="dialog"
    aria-modal="true"
    onMouseDown={(e) => {
      // click outside closes
      if (e.target === e.currentTarget) setIsPreviewOpen(false);
    }}
  >
    {/* backdrop */}
    <div className="absolute inset-0 bg-black/70" />

    {/* modal content */}
    <div className="relative w-full max-w-4xl">
      {/* close button */}
      <button
        type="button"
        onClick={() => setIsPreviewOpen(false)}
        className={`absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white text-[#122F2B] font-extrabold shadow ${darkBorder} hover:brightness-95`}
        aria-label="Close preview"
      >
        ×
      </button>

      {/* card */}
      <div className={`rounded-md bg-white ${darkBorder} p-5`}>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#122F2B] leading-tight">
          {title.trim() || "Title Goes Here"}
        </h1>

        <p className="mt-3 text-sm md:text-base font-semibold text-[#122F2B]">
          {content.trim() ||
            "This is the body of this announcement. The main purpose of the announcement is for easier communication in the department. Lecturers can only drop update regarding high importance to themselves and can also specify the level for a particular update."}
        </p>

        {filePreviewUrl ? (
          <div className="mt-4 w-28 h-20 rounded-md overflow-hidden border border-emerald-200/80">
            <img
              src={filePreviewUrl}
              alt="announcement attachment"
              className="w-full h-full object-cover"
            />
          </div>
        ) : null}

        <p className="mt-4 italic font-bold text-sm md:text-base text-[#122F2B]">
          Posted by{" "}
          <span className="font-extrabold">
            {name.trim() || "Lecturer One"}
          </span>{" "}
          on{" "}
          <span className="text-red-600 font-extrabold">
            {new Date().toISOString().slice(0, 10)}
          </span>
        </p>
      </div>
    </div>
  </div>
)}

        <div className="h-6" />
      </div>
    </div>
  );
}