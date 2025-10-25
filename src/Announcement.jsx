import React, { useState } from 'react';

function Announcement(props) {
    const [announceList, setannounceList] = useState([
        {
            title: 'Title Goes Here',
            body: 'This is the body of this announcement. The main purpose of the announcement is for easier communication in the department. Lecturers can only drop update regarding high importance to themselves and can also specify the level for a particular update.',
            img: './prove.jpg ',
            date: '2026-03-11',
            admin: 'A.T. Imam'
        },
        {
            title: 'Title Goes Here',
            body: 'This is the body of this announcement. The main purpose of the announcement is for easier communication in the department. Lecturers can only drop update regarding high importance to themselves and can also specify the level for a particular update.',
            img: './prove.jpg ',
            date: '2026-03-11',
            admin: 'A.T. Imam'
        }
    ])


    return (
        <div className="default">
            <h1 className="head1 mb-4">ANNOUNCEMENT</h1>

            <div className="bg-[#0b3b0b] rounded min-h-screen md:p-6 p-4">
                <h2 className="md:text-3xl text-xl font-bold mb-2 md:mb-4 md:text-center"> All Announcements </h2>

                <div className='announce'>
                    {announceList.map((item, index) => (
                        <div key={index} className='announceItem'>
                            <h1> {item.title} </h1>
                            <p> {item.body} </p>
                            <img src={item.img ? item.img : null } 
                                className='md:size-1/4'
                            />
                            <p className='italic font-semibold'> Posted by {item.admin} on <span className='text-red-600'> {item.date} </span> </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Announcement;