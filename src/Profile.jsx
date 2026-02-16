import React from 'react';
import StudentTimeline from './StudentTimeline';
import GPAChart from './GPAChart';
import { useState, useEffect } from 'react';
import { API_BASE } from './api';
import { Link } from 'react-router-dom';

function Profile(props) {

      const [student, setStudent] = useState(null);
      const [error, setError] = useState("");
      const [loading, setLoading] = useState(true);

    
      useEffect(() => {
        let mounted = true;

        const fetchStudent = async () => {
        try {
            setError("");

            const res = await fetch(
            `${API_BASE}/get_student.php`,
            {
                method: "GET",
                credentials: "include", 
            }
            );

            const text = await res.text();
            let data;

            try {
            data = JSON.parse(text);
            } catch {
            if (!mounted) return;
            console.log("RAW RESPONSE:", text);
            setError("Backend did not return JSON.");
            setLoading(false);
            return;
            }

            if (!mounted) return;

            if (data.status === "success") {
            setStudent(data.data?.student ?? null);
            setLoading(false);
            return;
            }

            // 🔹 If session is gone / expired → back to login
            if (res.status === 401) {
            setStudent(null);
            setLoading(false);
            navigate("/student_login");
            return;
            }

            setStudent(null);
            setLoading(false);
            setError(data.message || "Failed to load student data.");
        } catch (err) {
            console.error("Error fetching student data:", err);
            if (!mounted) return;
            setLoading(false);
            setError("Error fetching student data. Please try again.");
        }
        };

        fetchStudent();
    
        // Refresh every 30 seconds
        const interval = setInterval(fetchStudent, 30000);
        return () => clearInterval(interval);
      }, []);
    
      if (!student) return <div>Loading...</div>;

    const demoGr = [
        {head: 'Contact Information', val:[
            {
                name: 'Email Address', value: student? student.email : 'Student'
            },
            {
                name: 'Phone Number', value: student? student.phone : ''
            },
            {
                name: 'Residential Address', value: student? student.location : ""
            }]
        },

        {head: 'Demographic Information', val:[
            {
                name: 'Date of Birth', value: student? student.dob : ""
            },
            {
                name: 'Gender', value: student? student.sex : ""
            },
            {
                name: 'Nationality', value: student? student.nation : ""
            }]
        },
        {head: 'Emergency Contact', val:[
            {
                name: 'Name', value: student? student.emg_cnt : ""
            },
            {
                name: 'Phone Number', value: student? student.e_phone : ""
            },
            {
                name: 'Relationship', value: student? student.relation : ""
            }]
        }
    ]



    return (
        <div className="default">
            <h1 className="head1 mb-4"> Profile </h1>

            <div className="bg-[#0b3b0b] rounded min-h-screen md:p-6 p-4">
                <div>
                    <h2 className="md:text-2xl text-xl font-bold mb-2 md:mb-4"> Student's Information </h2>
                    <div className='bg-[#041b04] lg:flex-row flex flex-col p-2 md:p-4 justify-between rounded-xl items-center'>
                        <div className='py-8 px-4 flex flex-col gap-6 shadow-xl'>
                            <div className='shiffy'>
                                <img
                                src="./me.jpg"
                                alt="Profile"
                                className="w-40 h-40 rounded-full"
                                />
                                <div>
                                    <h1 className='text-center mb-2'>{student? student.name : 'Student'}</h1>
                                    <p>{student? student.reg_number : ''}</p>
                                    <p>Mathematics</p>
                                </div>
                            </div>
                            <div>
                                <p>Faculty: <span className='font-bold'> Faculty of Physical Science </span> </p>
                                <p>Department: <span className='font-bold'> Department of Mathematics </span> </p>
                                <p>Session: <span className='font-bold'> 2025/2026 </span> </p>
                                <p>Level: <span className='font-bold'> 300L </span> </p>
                            </div>
                        </div>
                        <div className='gpa_box'>
                            <h2> Calculated GPA  </h2>
                            <h1> 3.67 </h1>
                        </div>
                    </div>
                    <h2 className="md:text-2xl text-xl font-bold mt-10 mb-2 md:mb-4"> Personal Details </h2>
                    <div className=''>
                        <div className='grid lg:grid-cols-2 gap-6'>
                            {demoGr.map((section, index) => (
                                <div key={index} className="profile_grid">
                                <h2>{section.head}</h2>

                                {/* Grid layout for fields */}
                                <div className="">
                                    {section.val.map((item, idx) => (
                                    <div key={idx}>
                                        <div className="demoG">
                                            <p>{item.name}</p>
                                            <h3>{item.value}</h3>
                                        </div>
                                        <hr className='my-1'/>
                                    </div>
                                    ))}
                                </div>
                                </div>
                            ))}

                            <div>
                                <Link to="/edit_profile">
                                    <button className="cursor-pointer bg-white hover:bg-green-600 text-green-700 font-bold text-lg px-8 py-3 rounded-xl">Edit Profile</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Cards */}
                <div>
                    <h2 className="md:text-2xl text-xl font-bold mt-10 mb-2 md:mb-4"> Student's Information </h2>
                    <div className='studenttimeline_card'>
                        <StudentTimeline 
                            level= {student? student.level : 'Not Found'} 
                            faculty="Physical Science"
                            coursesEnrolled= {student? student.course : ""} 
                            complaintsPublished={4}
                        />
                    </div>  
                </div>
                <GPAChart faculty={'Science'}/>
                

            </div>
            
        </div>
    );
}

export default Profile;