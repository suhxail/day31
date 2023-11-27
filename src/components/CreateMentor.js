import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CreateMentor({ addMentor }) {

  const [mentor, setMentor] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(["Web Development", "Android Development", "Testing"])

  const navigate = useNavigate()

  const handleChange = (e) => {
    setMentor({ ...mentor, [e.target.name]: e.target.value })
    setSelectedCourse(selectedCourse)
  }

  const handleAddButton = (e) => {
    e.preventDefault();
    if (mentor.name && mentor.email && mentor.mobileNumber  !== null) {
      if ( mentor.course && mentor.mobileNumber.length == 10) {
        addMentor(mentor)
        console.log(mentor)
        navigate('/')
      }
      else {
        alert("Enter valid credentials")
      }
    } 
  }
  return (
    <div className='container'>
      <h3 className='create-text'>Create Mentor</h3>
      <form className='create-form'>

        <label className='create-label'>Name:</label>
        <input className='create-input' placeholder='Enter name' type='text' required onChange={handleChange} name='name' value={mentor.name} />
        <br />
        <label className='create-label'>Email:</label>
        <input className='create-input' placeholder='Enter email' type='email' required onChange={handleChange} name='email' value={mentor.email} />
        <br />
        <label className='create-label'>Mobile Number:</label>
        <input className='create-input' placeholder='Enter mobile number' type='number' required onChange={handleChange} name='mobileNumber' value={mentor.mobileNumber} />
        <br />
        <label className='create-label'>Course:</label>
        <select className='create-input' onChange={handleChange} value={mentor.course} name='course'>
          <option>Select your course</option>
          <option>{selectedCourse[0]}</option>
          <option>{selectedCourse[1]}</option>
          <option>{selectedCourse[2]}</option>          
        </select>
        <br />
        <button onClick={handleAddButton} className="btn btn-success">
          Add Mentor
        </button>

        <br />
        <button type='submit' className="btn btn-danger" onClick={() => navigate('/')} >
          Go Back
        </button>

      </form>
    </div>
  )
}

export default CreateMentor