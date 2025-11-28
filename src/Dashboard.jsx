import { Bell } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        // Replace reg_number with the logged-in student's reg_number
        const storedStudent = JSON.parse(localStorage.getItem("loggedInStudent"));
        if (!storedStudent) return;

        const response = await fetch(`http://localhost/namssn_portal/get_student.php?reg_number=${storedStudent.reg_number}`);
        const data = await response.json();

        if (data.status === "success") {
          setStudent(data.student); // update state with latest info from DB
        }
      } catch (err) {
            console.error("Error fetching student data:", err);
      }
    };

    fetchStudent();

    // Optional: refresh every 30 seconds
    const interval = setInterval(fetchStudent, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!student) return <div>Loading...</div>;



  return (
    <div className="default">
      <h1 className="md:text-3xl text-2xl font-bold text-gray-100 mb-4">DASHBOARD</h1>

      {/* Welcome Section */}
      <div className="bg-[#067706] rounded-xl p-5 shadow-md border border-green-900 mb-6">
        <h1 className="head1">
          Welcome back{' '} <span className="text-white">{student? student.name : 'Student'}!</span>
        </h1>
        <p className="text-md text-gray-300 mt-1"> 
          Academic Session: <span className="text-[#041b04] font-bold">2024/2025</span> | 
          Semester: <span className="text-[#041b04] font-bold">First</span> | 
          Level: <span className="text-[#041b04] font-bold">{student? student.level : 'Level'}</span>
        </p>
      </div>

      {/* Top Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-white">
        <div className="bg-[#0b3b0b] p-4 rounded-xl border border-green-900 shadow-md">
          <h3 className="text-2xl font-black mb-2">GPA: 4.04 / 5.00</h3>
          <div className="flex gap-4 items-center">
            <div className="h-24 w-full bg-[#072707] rounded-lg flex items-center justify-center text-gray-400 text-sm">
                [GPA Chart Placeholder]
            </div>
            <Bell size={30} className="cursor-pointer"/>
          </div>  
        </div>

        <div className="bg-[#0b3b0b] p-4 rounded-xl border border-green-900 shadow-md flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-black mb-2">New Upload: <span className="text-green-400 text-3xl">3</span></h3>
            <h3 className="text-2xl font-black">Complaints: <span className="text-green-400 text-3xl">5</span></h3>
          </div>
          <div>
            <Bell size={30} className="cursor-pointer"/>
          </div>
        </div>
      </div>

      {/* Middle Section: Score Uploads and Announcements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-[#0b3b0b] p-4 rounded-xl border border-green-900 shadow-md">
          <h4 className="font-semibold mb-2 text-xl">Recent Score Uploads</h4>
          <ul className="text-sm text-gray-100 space-y-1">
            <li>Math311: Test 20/40 | Exam 70/100 <span className="float-right text-gray-100">09/23/25</span></li>
            <li>Math301: Test 25/40 | Exam 68/100 <span className="float-right text-gray-100">09/22/25</span></li>
            <li>Math321: Test 19/40 | Exam 72/100 <span className="float-right text-gray-100">09/20/25</span></li>
            <li>Math321: Test 19/40 | Exam 72/100 <span className="float-right text-gray-100">09/20/25</span></li>
          </ul>
          <hr className="mt-2 border-gray-400"/>
          <div className="flex items-center justify-center">
            <Link 
            to = '/scoreboard'>
              <button className="mt-3 px-4 cursor-pointer py-1 text-center bg-green-800 hover:bg-green-700 text-white text-sm rounded">
                View Scores
            </button>
            </Link>
          </div>
        </div>

        <div className="bg-[#0b3b0b] p-4 rounded-xl border border-green-900 shadow-md">
          <h4 className="font-semibold mb-2 text-xl">Department Announcements</h4>
          <ul className="list-disc ml-4 text-sm text-gray-100 space-y-1">
            <li>CoS301 added as a compulsory elective for 2025/2026.</li>
            <li>New mathematics lecturer: Prof. Shifaul Animashaun (CoS301).</li>
            <li>New mathematics lecturer: Prof. Shifaul Animashaun (CoS301).</li>
          </ul>
          <div className="flex flex-col justify-end">
            <div className="w-full">
                <hr className="mt-2 border-gray-400"/>
                <div className="flex items-center justify-center">
                    <Link to='/announce'>
                      <button className="mt-3 px-4 cursor-pointer py-1 text-center bg-green-800 hover:bg-green-700 text-white text-sm rounded">
                        See Anouncements
                      </button>
                    </Link>
                </div>
            </div>
          </div>
          
        </div>
      </div>

      <div className="flex items-center mb-6 justify-end pr-3">
        <div className="mt-4 flex gap-2">
            <Link to='/complaints'> 
              <button className="cursor-pointer bg-green-700 hover:bg-green-600 text-white text-sm px-8 py-3 rounded">
                Submit a Complaint
              </button>
            </Link>
        </div>
      </div>

      {/* Motivational Quotes Section */}
      <div className="bg-[#0b3b0b] rounded-xl p-4 border border-green-900 shadow-md">
        <h4 className="font-bold text-xl text-green-400 mb-2">Motivational Quotes</h4>
        <p className="text-gray-100 text-sm">
          “Mathematics possesses not only truth, but supreme beauty — a beauty cold and austere, like that of sculpture.”
        </p>
      </div>
    </div>
  );
}
