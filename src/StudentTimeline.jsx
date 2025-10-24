import React from 'react';

function StudentTimeline({ level, faculty, coursesEnrolled, complaintsPublished }) {

  function getAdmissionYear(currentYear, level) {
    const yearSpent = level / 100 - 1; 
    return currentYear - yearSpent;
  }

  function getGraduationYear(admissionYear, faculty) {
    const duration = {
      science: 4,
      engineering: 5,
      medicine: 6,
      education: 4,
      law: 5
    };

    const years = duration[faculty?.toLowerCase()] || 4;
    return admissionYear + years;
  }

  const currentYear = new Date().getFullYear();
  const admissionYear = getAdmissionYear(currentYear, level);
  const graduationYear = getGraduationYear(admissionYear, faculty);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Admission Year */}
      <div className="card_status group">
        <h3 className="head_card">Admission Year</h3>
        <p className="text-3xl font-bold text-green-500">
          {admissionYear}
        </p>
      </div>

      {/* Graduation Year */}
      <div className="card_status">
        <h3 className="head_card">Graduation Year</h3>
        <p className="text-3xl font-bold text-gray-950">
          {graduationYear}
        </p>
      </div>

      {/* Courses Enrolled */}
      <div className="card_status">
        <h3 className="head_card">Courses Enrolled</h3>
        <p className="text-3xl font-bold text-blue-600">
          {coursesEnrolled}
        </p>
      </div>

      {/* Complaints Published */}
      <div className="card_status">
        <h3 className="head_card">Complaints Published</h3>
        <p className="text-3xl font-bold text-orange-500">
          {complaintsPublished}
        </p>
      </div>
    </div>
  );
}

export default StudentTimeline;
