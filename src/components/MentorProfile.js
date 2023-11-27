import Reac, { useState } from 'react'

function MentorProfile() {

    const [selectedCourse, setSelectedCourse] = useState(["Web Development", "Android Development", "Testing"])

    return (
        <div className='container'>
            <h3 className='edit-text'>Mentor Profile</h3> 
            <form className='edit-form'>

                <label className='edit-label'>Name:</label>
                <input className='edit-input' placeholder='Enter name' type='text' required name='name' />


                <label className='edit-label'>Email:</label>
                <input className='edit-input' placeholder='Enter email' type='email' required name='email' />


                <label className='edit-label'>Mobile Number:</label>
                <input className='edit-input' placeholder='Enter mobile number' type='number' maxLength={10} required name='mobileNumber'  />


                <label className='edit-label'>Course:</label>
                <select className='edit-input' name='course'>
                    <option>{selectedCourse[0]}</option>
                    <option>{selectedCourse[1]}</option>
                    <option>{selectedCourse[2]}</option>                    
                </select>
                <br />
                <button type='submit'  >
                    Update
                </button>
            </form>
        </div>
    )
}

export default MentorProfile