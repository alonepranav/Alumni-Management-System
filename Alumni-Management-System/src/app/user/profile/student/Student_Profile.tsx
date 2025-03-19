import Alumni_Update_Profile_Photo from '../../../../components/User_Update_Profile_Photo';
import { useStudent } from '../../../../context/StudentContext';
import Loader from '../../../../components/Loader';
import { Link } from 'react-router-dom';
import { useState } from 'react';


export default function Student_Profile() {
  const [updatePhoto, setUpdatePhoto] = useState(false);

  const { student } = useStudent();
  if (!student) return <div className='h-screen w-screen flex justify-center items-center'><Loader /></div>;

  const Logout = () => {
    localStorage.clear();
    window.location.replace("/");
  }

  return (
    <div className='flex justify-center items-center min-h-screen py-28'>

      {
        updatePhoto ? <Alumni_Update_Profile_Photo {...{
          name: student.name, email: student.email, profilePhoto: student.profileImage, setUpdatePhoto,
          type: "student"
        }} /> : null
      }

      <div className='flex justify-center flex-col items-center'>
        <img src={student.profileImage} className='h-40 w-40 rounded-2xl border border-slate-300 p-2 shadow-lg shadow-slate-200' alt={student.name} />
        <div className="py-5">
          <p className='text-2xl font-semibold text-center'>{student.name}</p>
        </div>
        <table className='border border-slate-400 mt-3'>
          <tbody>
            <tr className='hover:bg-slate-100'>
              <td className='py-3 px-5 w-44 border border-slate-200'>Batch year</td>
              <td className='py-3 px-5 w-80 border border-slate-200'>{student.batch}</td>
            </tr>
            <tr className='hover:bg-slate-100'>
              <td className='py-3 px-5 w-44 border border-slate-200'>Bio</td>
              <td className='py-3 px-5 w-80 border border-slate-200'>{student.bio}</td>
            </tr>
            <tr className='hover:bg-slate-100'>
              <td className='py-3 px-5 w-44 border border-slate-200'>Linkedin</td>
              <td className='py-3 px-5 w-80 border border-slate-200'>
                <a href={student.linkedin} target='_blank'>{student.linkedin}</a>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-10 flex gap-8">
          <button onClick={Logout} className='text-white font-semibold bg-rose-500 px-7 py-2 rounded-lg'>Logout</button>
          <Link to={"/user/profile/student/edit-profile"}>
            <button className='text-white font-semibold bg-blue-500 px-5 py-2 rounded-lg'>Edit Profile</button>
          </Link>
          <button onClick={() => setUpdatePhoto(true)} className='text-white font-semibold bg-emerald-500 px-5 py-2 rounded-lg'>Update Profile Photo</button>
        </div>

      </div>
    </div>
  )
}