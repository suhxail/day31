import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function EditStudent({ updateStudent, currentStudent, studentIndex }) {
    const navigate = useNavigate()
    const [student, setStudent] = useState(currentStudent ? currentStudent : {
        name: "",
        email: "",
        mobileNumber: "",
        course: "",
        mentor: ""
    })

    const [selectedCourse, setSelectedCourse] = useState(["Web Development", "Android Development", "Testing"])

    const { id } = useParams()

    useEffect(() => {
        axios            
            .get(`https://65adf6e91dfbae409a73a2f3.mockapi.io/students/${id}`)
            .then(response => setStudent(response.data))
    }, [])

    const handleDelete = (e, i) => {
        console.log(i)
        e.preventDefault()
        const listOfMentor = student.mentor.filter((mentor, index) => (index) !== i)
        console.log(listOfMentor)
        let updatedStudent = { ...student, mentor: listOfMentor }

        axios           
            .put(`https://65adf6e91dfbae409a73a2f3.mockapi.io/students/${updatedStudent.id}`, updatedStudent)
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        updateStudent(student, studentIndex);
        navigate('/')
        console.log(student)
    }

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
        console.log(e.target.value, e.target.name)
    }
    useEffect(() => {
        console.log(student)
    }, [student])
    return (
        <div className='container'>
            <h3 className='edit-text'>Edit Student</h3>
            <form className='edit-form'>

                <label className='edit-label'>Name:</label>
                <input className='edit-input' placeholder='Enter name' type='text' required name='name' onChange={handleChange} value={student.name} />
                <br />
                <label className='edit-label'>Email:</label>
                <input className='edit-input' placeholder='Enter email' type='email' required name='email' onChange={handleChange} value={student.email} />

                <br />
                <label className='edit-label'>Mobile Number:</label>
                <input className='edit-input' placeholder='Enter mobile number' type='number' maxLength={10} required name='mobileNumber' onChange={handleChange} value={student.mobileNumber} />
                <br />
                <label className='edit-label'>Course:</label>
                <select className='edit-input' onChange={handleChange} value={student.course} name='course'>
                    <option>Select a course</option>
                    <option>{selectedCourse[0]}</option>
                    <option>{selectedCourse[1]}</option>
                    <option>{selectedCourse[2]}</option>
                </select>
                <br />
                <label className='edit-label'>Mentor:</label>
                <table >
                    <thead >
                        <tbody >
                            <tr >
                                <td>
                                    {
                                        student.mentor && student.mentor.map((data, id) => {
                                            if (student.mentor.length !== null) {
                                                return <div key={id} className='edit-label'>
                                                    <label className='edit-mentor-label'>{data}</label>
                                                </div>
                                            }

                                        })
                                    }
                                </td>                                
                            </tr>
                        </tbody>
                    </thead>
                </table>
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

export default EditStudent