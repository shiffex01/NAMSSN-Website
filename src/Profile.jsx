import React from 'react';
import StudentTimeline from './StudentTimeline';
import GPAChart from './GPAChart';
import { useState, useEffect } from 'react';

function Profile(props) {

      const [student, setStudent] = useState(null);
    
      useEffect(() => {
        const fetchStudent = async () => {
          try {
            // Replace reg_number with the logged-in student's reg_number
            const storedStudent = JSON.parse(localStorage.getItem("loggedInStudent"));
            if (!storedStudent) return;
    
            const response = await fetch(`http://192.168.137.1/namssn_portal/get_student.php?reg_number=${storedStudent.reg_number}`);
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

    const demoGr = [
        {head: 'Contact Information', val:[
            {
                name: 'Email Address', value: 'shiffex12anny@gmail.com'
            },
            {
                name: 'Phone Number', value: '08022935952'
            },
            {
                name: 'Residential Address', value: 'Samaru, ABU, Zaria'
            }]
        },

        {head: 'Demographic Information', val:[
            {
                name: 'Date of Birth', value: '2000-03-03'
            },
            {
                name: 'Gender', value: 'Female'
            },
            {
                name: 'Nationality', value: 'Nigeria'
            }]
        },
        {head: 'Emergency Contact', val:[
            {
                name: 'Name', value: 'Ayodeji'
            },
            {
                name: 'Phone Number', value: '02033746533'
            },
            {
                name: 'Relationship', value: 'Sibling'
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
                                    <h1>{student? student.full_name : 'Student'}</h1>
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
                                        <div className=" flex items-center justify-between">
                                            <p>{item.name}</p>
                                            <p>{item.value}</p>
                                        </div>
                                        <hr className='my-1'/>
                                    </div>
                                    ))}
                                </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Cards */}
                <div>
                    <h2 className="md:text-2xl text-xl font-bold mt-10 mb-2 md:mb-4"> Student's Information </h2>
                    <div className='studenttimeline_card'>
                        <StudentTimeline 
                            level={300} 
                            faculty="Physical Science"
                            coursesEnrolled={12} 
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