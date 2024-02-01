import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditMentor({ currentMentor, mentorIndex, studentList, mentorList }) {
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
      .get(`https://65adf6e91dfbae409a73a2f3.mockapi.io/mentors/${id}`)
      .then(response => setMentor(response.data))
  }, [])


  const handleUpdate = (e) => {
    e.preventDefault()
    navigate('/')
  }

  const handleChange = (e) => {
    setMentor({ ...mentor, [e.target.name]: e.target.value });
    console.log(e.target.value, e.target.name)
  }

  useEffect(() => {
    console.log(mentor)
  }, [mentor])


  const handleDelete = async (i, ind) => {
    i.preventDefault()

    let mentorTemp = {};
    let studentTemp = {}

    mentorList.map((mentor, index) => {
      if (ind == index) {
        mentorTemp = mentor
      }
    })
    console.log(mentorTemp)
    studentList.map((student) => {
      if (mentorTemp.students?.includes(student.name)) {
        studentTemp = student
      }
    })
    console.log(mentorTemp)
    const a = mentorTemp.students.filter((student, index) => {
      if (student != studentTemp.name) {

        return student
      }
    })
    console.log(a)
    const b = studentTemp.mentor.filter((mentor, index) => {
      if (mentor != mentorTemp.name) {

        return mentor
      }
    })

    mentorTemp["students"] = a;
    studentTemp["mentor"] = b



    await axios
      .put(`https://65adf6e91dfbae409a73a2f3.mockapi.io/mentors/${mentorTemp.id}`, mentorTemp)


    await axios
      .put(`https://65adf6e91dfbae409a73a2f3.mockapi.io/students/${studentTemp.id}`, studentTemp)

    axios
      .get(`https://65adf6e91dfbae409a73a2f3.mockapi.io/mentors/${mentorTemp.id}`)
      .then(response => setMentor(response.data))
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
          <option>Select a course</option>
          <option>{selectedCourse[0]}</option>
          <option>{selectedCourse[1]}</option>
          <option>{selectedCourse[2]}</option>
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
                      if (mentor.students.length !== null) {
                        return <div key={id} className='edit-label'>
                          <label className='edit-mentor-label'>{data}:</label>
                        </div>
                      }
                    })
                  }
                </td>

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