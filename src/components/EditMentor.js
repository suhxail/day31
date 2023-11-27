import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditMentor({ updateMentor, currentMentor, mentorIndex }) {
  const navigate = useNavigate()
  const [mentor, setMentor] = useState(currentMentor ? currentMentor : {
    name: "",
    email: "",
    mobileNumber: "",
    course: "",
  }
  )

  const [selectedCourse, setSelectedCourse] = useState(["Web Development", "Android Development", "Testing"])

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3007/mentors/${id}`)
      .then(response => setMentor(response.data))
  },[mentor])


  const handleUpdate = (e) => {
    e.preventDefault()
    if (mentor.mobileNumber.length === 10) {
      updateMentor(mentor, mentorIndex);
      navigate('/')
    } else {
      alert("Enter valid credentials")
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    setMentor({ ...mentor, [e.target.name]: e.target.value });
    setSelectedCourse(selectedCourse)
  }


  const handleDelete = (e, i) => {
    console.log(i)
    e.preventDefault()
    const listOfStudents = mentor.students.filter((student, index) => (index) !== i)
    console.log(listOfStudents)
    let updatedMentor = { ...mentor, students: listOfStudents }

    axios
      .put(`http://localhost:3007/mentors/${updatedMentor.id}`, updatedMentor)
  }

  return (
    <div className='container'>
      <h3 className='edit-text'>Edit Mentor</h3>
      <form className='edit-form'>

        <label className='edit-label'>Name:</label>
        <input className='edit-input' placeholder='Enter name' type='text' required name='name' onChange={handleChange} value={mentor.name} />
        <br />
        <label className='edit-label'>Email:</label>
        <input className='edit-input' placeholder='Enter email' type='email' required name='email' onChange={handleChange} value={mentor.email} />
        <br />
        <label className='edit-label'>Mobile Number:</label>
        <input className='edit-input' placeholder='Enter mobile number' type='number' maxLength={10} required name='mobileNumber' onChange={handleChange} value={mentor.mobileNumber} />
        <br />
        <label className='edit-label'>Course:</label>
        <select className='edit-input' onChange={handleChange} value={mentor.course} name='course'>
          <option>{selectedCourse[0]}</option>
          <option>{selectedCourse[1]}</option>
          <option>{selectedCourse[2]}</option>
          <option>{selectedCourse[3]}</option>
        </select>
        <br />
        <label className='edit-label'>Students:</label>
        <table >
          <thead >
            <tbody >

              <tr >
                <td>
                  {
                    mentor.students && mentor.students.map((data, id) => {
                      // for (let i = 0; i <= mentor.students.length; i++) {
                        if (mentor.students.length !== null) {
                          return <div key={id} className='edit-label'>
                            <label className='edit-mentor-label'>{data}:</label>
                          </div>
                        }
                      }
                    // }
                    )
                  }
                </td>
                <br />
                <td>
                  {
                    mentor.students && mentor.students.map((data, id) => {
                      if (data !== null) {
                        return <div>
                          <button className='edit-mentor-btn' onClick={(e) => handleDelete(e, id)} >Delete</button>
                        </div>
                      }
                    })
                  }
                </td>

              </tr>
            </tbody>
          </thead>
        </table>
        <br />
        <button type='submit' className="btn btn-success" onClick={handleUpdate} >
          Update
        </button>
        <br />
        <button type='submit' className="btn btn-danger" onClick={() => navigate('/')} >
          Go Back
        </button>
      </form>
    </div>
  )

}

export default EditMentor