import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import { Route, Routes, useParams } from 'react-router-dom'
import CreateStudent from './CreateStudent'
import CreateMentor from './CreateMentor'
import AssignStudent from './AssignStudent'
import EditStudent from './EditStudent'
import EditMentor from './EditMentor'
import axios from 'axios'

function Topbar() {

    const [studentList, setStudentList] = useState([])
    const [mentorList, setMentorList] = useState([])
    const [currentStudent, setCurrentStudent] = useState([])
    const [currentMentor, setCurrentMentor] = useState([])
    const [studentIndex, setStudentIndex] = useState()
    const [mentorIndex, setMentorIndex] = useState()   

    useEffect(() => {
        axios
            .get('http://localhost:3006/students')  
            .then(response => setStudentList(response.data))
    },[studentList])

    const {id} = useParams()

    const addStudent = (student) => {
        let newStudent = { ...student };
        newStudent.id = studentList.length + 1
        newStudent.mentor = []
        setStudentList([...studentList, newStudent])

        axios
            .post('http://localhost:3006/students', newStudent)

    } 

    const editStudent = (student, studentIndex) => {        
        setCurrentStudent(student)
        setStudentIndex(studentIndex)
        console.log(student) 
    }

    const updateStudent = (updatedStudent, student) => {
        console.log(studentIndex);
        const StudentList = [...studentList]
        StudentList[studentIndex] = { ...updatedStudent }
        console.log(StudentList)
        setStudentList([...StudentList])

        axios
            .put(`http://localhost:3006/students/${updatedStudent.id}`, updatedStudent)

    }

    const deleteStudent = (id) => {
        const currentStudentList = [...studentList];
        const newStudentList = currentStudentList.filter((student, index) => student.id !== id)
        setStudentList(newStudentList)

        axios
            .delete(`http://localhost:3006/students/${id}`)
    }

    useEffect(() => {
        axios
            .get('http://localhost:3007/mentors')
            .then(response => setMentorList(response.data))
    },[mentorList])

    const addMentor = (mentor) => {
        let newMentor = { ...mentor }
        newMentor.id = mentorList.length + 1
        newMentor.students = []       
        setMentorList([...mentorList, newMentor])

        axios
            .post('http://localhost:3007/mentors', newMentor)
        console.log(mentorList)
    }
    // console.log(mentorList)

    const deleteMentor = (id) => {
        const currentMentorList = [...mentorList]
        const newMentorList = currentMentorList.filter((mentor, index) => mentor.id !== id)
        setMentorList(newMentorList)

        axios
            .delete(`http://localhost:3007/mentors/${id}`)
    }

    const editMentor = (mentor, mentorIndex) => {
        setCurrentMentor(mentor)
        setMentorIndex(mentorIndex)
        console.log(mentor)

        axios
            .get(`http://localhost:3007/mentors/${mentor.id}`)

    }

    const updateMentor = (updatedMentor) => {
        const MentorList = [...mentorList]
        MentorList[mentorIndex] = { ...updatedMentor }
        setMentorList([...MentorList])

        axios
            .put(`http://localhost:3007/mentors/${updatedMentor.id}`, updatedMentor)
    }

    const assignStudent = (Student, mentor) => {
        console.log(Student, mentor)
        let data = {}
        const updatedStudents = studentList.map((student) => {            
            console.log(student.id,Student.id)
            if (student.id == Student.id) {                
                const a = { ...student, mentor: [ ...student.mentor, mentor.name] };
                // const a = { ...mentor, students: [...mentor.students, student.name] } 
                // const b = studentList.push(a)
                data = a
                return data
            } else {
                return student;
            }
        });
        console.log(updatedStudents)
        axios
            .put(`http://localhost:3006/students/${data.id}`, data)
        setStudentList(updatedStudents);
    };

    const assignMentor = async (Mentor, student) => {
        console.log(Mentor, mentorList)
       
        let data = {}
        const updatedMentors = mentorList.map((mentor) => {
            console.log(Mentor.id, mentor.id)
            if (mentor.id == Mentor.id) {                
                const a = { ...mentor, students: [...mentor.students, student.name] }                
                data = a
                return data
            }
            else {
                return mentor
            }
        })
        console.log(updatedMentors)
        await axios
            .put(`http://localhost:3007/mentors/${data.id}`, data)
        setMentorList(updatedMentors)
    }


    return (
        <div id="content-wrapper" className="d-flex flex-column">
            <div id='content'>
                <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                    {/* <!-- Sidebar Toggle (Topbar) --> */}
                    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                        <i className="fa fa-bars"></i>
                    </button>

                    {/* <!-- Topbar Search --> */}
                    <form
                        className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                        <div className="input-group">
                            <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..."
                                aria-label="Search" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button">
                                    <i className="fas fa-search fa-sm"></i>
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* <!-- Topbar Navbar --> */}
                    <ul className="navbar-nav ml-auto">

                        {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
                        <li className="nav-item dropdown no-arrow d-sm-none">
                            <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-search fa-fw"></i>
                            </a>
                            {/* <!-- Dropdown - Messages --> */}
                            <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                aria-labelledby="searchDropdown">
                                <form className="form-inline mr-auto w-100 navbar-search">
                                    <div className="input-group">
                                        <input type="text" className="form-control bg-light border-0 small"
                                            placeholder="Search for..." aria-label="Search"
                                            aria-describedby="basic-addon2" />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" type="button">
                                                <i className="fas fa-search fa-sm"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </li>

                        {/* <!-- Nav Item - Alerts --> */}
                        <li className="nav-item dropdown no-arrow mx-1">
                            <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-bell fa-fw"></i>
                                {/* <!-- Counter - Alerts --> */}
                                <span className="badge badge-danger badge-counter">3+</span>
                            </a>
                            {/* <!-- Dropdown - Alerts --> */}
                            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="alertsDropdown">
                                <h6 className="dropdown-header">
                                    Alerts Center
                                </h6>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                    <div className="mr-3">
                                        <div className="icon-circle bg-primary">
                                            <i className="fas fa-file-alt text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="small text-gray-500">December 12, 2019</div>
                                        <span className="font-weight-bold">A new monthly report is ready to download!</span>
                                    </div>
                                </a>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                    <div className="mr-3">
                                        <div className="icon-circle bg-success">
                                            <i className="fas fa-donate text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="small text-gray-500">December 7, 2019</div>
                                        $290.29 has been deposited into your account!
                                    </div>
                                </a>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                    <div className="mr-3">
                                        <div className="icon-circle bg-warning">
                                            <i className="fas fa-exclamation-triangle text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="small text-gray-500">December 2, 2019</div>
                                        Spending Alert: We've noticed unusually high spending for your account.
                                    </div>
                                </a>
                                <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                            </div>
                        </li>

                        {/* <!-- Nav Item - Messages --> */}
                        <li className="nav-item dropdown no-arrow mx-1">
                            <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-envelope fa-fw"></i>
                                {/* <!-- Counter - Messages --> */}
                                <span className="badge badge-danger badge-counter">7</span>
                            </a>
                            {/* <!-- Dropdown - Messages --> */}
                            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="messagesDropdown">
                                <h6 className="dropdown-header">
                                    Message Center
                                </h6>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                    <div className="dropdown-list-image mr-3">
                                        <img className="rounded-circle" src="img/undraw_profile_1.svg"
                                            alt="..." />
                                        <div className="status-indicator bg-success"></div>
                                    </div>
                                    <div className="font-weight-bold">
                                        <div className="text-truncate">Hi there! I am wondering if you can help me with a
                                            problem I've been having.</div>
                                        <div className="small text-gray-500">Emily Fowler · 58m</div>
                                    </div>
                                </a>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                    <div className="dropdown-list-image mr-3">
                                        <img className="rounded-circle" src="img/undraw_profile_2.svg"
                                            alt="..." />
                                        <div className="status-indicator"></div>
                                    </div>
                                    <div>
                                        <div className="text-truncate">I have the photos that you ordered last month, how
                                            would you like them sent to you?</div>
                                        <div className="small text-gray-500">Jae Chun · 1d</div>
                                    </div>
                                </a>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                    <div className="dropdown-list-image mr-3">
                                        <img className="rounded-circle" src="img/undraw_profile_3.svg"
                                            alt="..." />
                                        <div className="status-indicator bg-warning"></div>
                                    </div>
                                    <div>
                                        <div className="text-truncate">Last month's report looks great, I am very happy with
                                            the progress so far, keep up the good work!</div>
                                        <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                                    </div>
                                </a>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                    <div className="dropdown-list-image mr-3">
                                        <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                                            alt="..." />
                                        <div className="status-indicator bg-success"></div>
                                    </div>
                                    <div>
                                        <div className="text-truncate">Am I a good boy? The reason I ask is because someone
                                            told me that people say this to all dogs, even if they aren't good...</div>
                                        <div className="small text-gray-500">Chicken the Dog · 2w</div>
                                    </div>
                                </a>
                                <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                            </div>
                        </li>

                        <div className="topbar-divider d-none d-sm-block"></div>

                        {/* <!-- Nav Item - User Information --> */}
                        <li className="nav-item dropdown no-arrow">
                            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="mr-2 d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
                                <img className="img-profile rounded-circle"
                                    src="img/undraw_profile.svg" />
                            </a>
                            {/* <!-- Dropdown - User Information --> */}
                            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="userDropdown">
                                <a className="dropdown-item" href="#">
                                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Profile
                                </a>
                                <a className="dropdown-item" href="#">
                                    <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Settings
                                </a>
                                <a className="dropdown-item" href="#">
                                    <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Activity Log
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Logout
                                </a>
                            </div>
                        </li>

                    </ul>

                </nav>
                <Routes>
                    <Route path='/' element={<Dashboard studentList={studentList} mentorList={mentorList} currentStudent={currentStudent} deleteStudent={deleteStudent} deleteMentor={deleteMentor} editStudent={editStudent} editMentor={editMentor} />} />
                    <Route path='/create-student' element={<CreateStudent addStudent={addStudent} />} />
                    <Route path='/create-mentor' element={<CreateMentor addMentor={addMentor} />} />
                    <Route path='/assign-student' element={<AssignStudent assignStudent={assignStudent} studentList={studentList} mentorList={mentorList} assignMentor={assignMentor} />} />
                    <Route path='/edit-student/:id' element={<EditStudent updateStudent={updateStudent} currentStudent={currentStudent} studentIndex={studentIndex} />} />
                    <Route path='/edit-mentor/:id' element={<EditMentor updateMentor={updateMentor} currentMentor={currentMentor} mentorIndex={mentorIndex} />} />

                </Routes>

            </div>
        </div>

    )
}

export default Topbar