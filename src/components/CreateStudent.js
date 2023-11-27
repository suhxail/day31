import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CreateStudent({ addStudent }) {

  const [student, setStudent] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(["Web Development", "Android Development", "Testing"])
  const navigate = useNavigate()

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value })
    setSelectedCourse(selectedCourse)
  }

  const handleAddButton = (e) => {
    e.preventDefault();
    if (student.name && student.email && student.mobileNumber !== null) {
      if (student.course && student.course && student.mobileNumber.length == 10) {
        addStudent(student)
        console.log(student)
        console.log(student.course)
        navigate('/')
      } else {
        alert("Enter valid credentials")
      }
    }
  }

  return (
    <div className='container'>
      <h3 className='create-text'>Create Student</h3>
      <form className='create-form'>

        <label className='create-label'>Name:</label>
        <input className='create-input' placeholder='Enter name' type='text' required onChange={handleChange} value={student.name} name='name' />
        <br />
        <label className='create-label'>Email:</label>
        <input className='create-input' placeholder='Enter email' type='email' required onChange={handleChange} value={student.email} name='email' />
        <br />
        <label className='create-label'>Mobile Number:</label>
        <input className='create-input' placeholder='Enter mobile number' type='number' maxLength={10} required onChange={handleChange} value={student.mobileNumber} name='mobileNumber' />
        <br />
        <label className='create-label'>Course:</label>
        <select className='create-input' onChange={handleChange} value={student.course} name='course' required>
          <option>Select your course</option>
          <option>{selectedCourse[0]}</option>
          <option>{selectedCourse[1]}</option>
          <option>{selectedCourse[2]}</option>
        </select>
        <br />
        <button onClick={handleAddButton} type='submit' className='btn btn-success' >
          Add Student
        </button>
        <br />
        <button type='submit' className="btn btn-danger" onClick={() => navigate('/')} >
          Go Back
        </button>
      </form>
    </div>
  )
}

export default CreateStudent