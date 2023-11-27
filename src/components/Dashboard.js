import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard({ currentStudent, studentList, mentorList, deleteStudent, deleteMentor, editStudent, editMentor }) {


  const navigate = useNavigate();

  const EditStudent = (student, studentIndex) => {
    editStudent(student, studentIndex)
    navigate(`edit-student/${student.id}`)
    console.log(student)
  }

  const EditMentor = (mentor, mentorIndex) => {
    editMentor(mentor, mentorIndex)
    navigate(`edit-mentor/${mentor.id}`)
    console.log(mentor)
  }

  return (
    <div>
      <div className="col text-start">
        <h4 className='dashboard-text'>Student List</h4>
        <table className="table table-striped">
          <thead>
            <tr className="table-primary">
              <th>Sl no</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Course</th>
              <th>Mentor</th>
              <th>Actions</th>
            </tr>

            {studentList && studentList.map((student, index) => (
              student.name &&
              <tr className="table-secondary" key={index}>
                <td>{student.id}</td>
                <td><p>{student.name}</p></td>
                <td><p>{student.email}</p></td>
                <td><p>{student.mobileNumber}</p></td>
                <td><p>{student.course}</p></td>
                {/* <td><p>{student.mentor}</p></td> */}
                <td>
                  {
                    student.mentor && student.mentor.map((data,id) => {
                      if(student.mentor.length !== null){
                        return <p key={id}>{data}</p>
                      } else {
                        return ""
                      }
                    })
                  }
                    {/* {
                      mentor.students && mentor.students.map((data, id) => {
                        if (mentor.students.length !== null) {
                          return <p key={id}>{data}</p>
                        }
                      })
                    } */}
                </td>
                {student ?
                  <td>
                    <button className="btn btn-primary" onClick={() => EditStudent(student, index)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => deleteStudent(student.id)}>Delete</button>
                  </td>
                  : ""
                }
              </tr>
            )
            )}

          </thead>
        </table>
      </div>

      <div className="col text-start">
        <h4 className='dashboard-text' >Mentor List</h4>
        <table className="table table-striped">
          <thead>
            <tr className="table-primary">
              <th>Sl no</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Course</th>
              <th>Students</th>
              <th>Actions</th>
            </tr>
            {mentorList && mentorList.map((mentor, index) =>
              < tr className="table-secondary" key={index} >
                <td>{mentor.id}</td>
                <td><p>{mentor.name}</p></td>
                <td><p>{mentor.email}</p></td>
                <td><p>{mentor.mobileNumber}</p></td>
                <td><p>{mentor.course}</p></td>
                <td>
                  { 
                    mentor.students && mentor.students.map((data, id) => {                      
                      if (mentor.students.length !== null) {
                        return <p key={id}>{data}</p>
                      }
                    }) 
                  }
                 
                </td>
                {
                  mentor ?
                    <td>
                      <button className="btn btn-primary" onClick={() => EditMentor(mentor, index)}>Edit</button>
                      <button className="btn btn-danger" onClick={() => deleteMentor(mentor.id)}>Delete</button>
                    </td>
                    : ""
                }
              </tr>
            )}
          </thead>
        </table>
      </div>
    </div >
  )
}

export default Dashboard