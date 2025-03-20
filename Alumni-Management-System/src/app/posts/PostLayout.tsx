import { useStudent } from '../../context/StudentContext'
import { useAlumni } from '../../context/AlumniContext'
import { Link, Outlet } from 'react-router-dom';

export default function PostLayout() {
    const { student } = useStudent();
    const { alumni } = useAlumni();

    if (student || alumni)
        return <Outlet />

    return <LoginToPost />
}

const LoginToPost = () => {
    return <div className='h-screen w-screen flex justify-center items-center'>
        <div className=" flex flex-col items-center gap-8">
            <p className='text-3xl font-semibold text-rose-500'>Login to continue ...</p>
            <Link className='px-5 font-semibold text-lg block py-1 bg-black rounded-md text-white' to={"/auth/student/login"}>Login now</Link>
        </div>
    </div>
}