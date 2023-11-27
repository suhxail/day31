import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AssignStudent({ assignStudent, studentList, mentorList, assignMentor }) {
  const navigate = useNavigate();
  const [student, setStudent] = useState([]);
  const [mentor, setMentor] = useState([]);
  const [viewSelectedStudent, setViewSelectedStudent] = useState({})
  const [viewSelectedMentor, setViewSelectedMentor] = useState({})
  useEffect(() => {
    axios
      .get('http://localhost:3006/students')
      .then(response => setStudent(response.data))
  }, [])

  useEffect(() => {
    axios
      .get('http://localhost:3007/mentors')
      .then(response => setMentor(response.data))
  }, [])

  const handleAssign = () => {
    console.log(student)
    console.log(mentor)
    console.log(mentorList)
    if (student && mentor) {      
      assignStudent(viewSelectedStudent,viewSelectedMentor)      
      assignMentor(viewSelectedMentor,viewSelectedStudent)
      
      navigate('/');
    } else {      
      alert('Please select a student and a mentor');
    }
  };

  const handleStudentChange = (e) => {
    const selectedStudent = studentList.find((s) => s.id == e.target.value);    
    setViewSelectedStudent(selectedStudent)
  };

  const handleMentorChange = (e) => {
    const selectedMentor = mentorList.find((m) => m.id == e.target.value);
    console.log(selectedMentor, e.target.value)    
    setViewSelectedMentor(selectedMentor)

  };

  return (
    <div className='container'>
      <h4 className='dashboard-text'>Assign student to mentor</h4>
      <div className='create-form'>
        <div>
          <p className='create-label'>Mentor</p>
          <select className='create-input' onChange={handleMentorChange} >
            <option>Select mentor</option>
            
            {
              mentor && mentor.map(data => (<option key={data.id} value={data.id} >{data.name}</option>))
            }

          </select>

        </div>

        <div>
          <p className='create-label'>Student</p>
          <select className='create-input' onChange={handleStudentChange} >
            <option>Select student</option>
            
            {
              student && student.map(data => (<option key={data.id} value={data.id}>{data.name}</option>))
            }

          </select>
        </div>
        <br />
        <div>
          <button onClick={handleAssign}>Assign student</button>
        </div>
      </div>
    </div>
  );
}

export default AssignStudent;

