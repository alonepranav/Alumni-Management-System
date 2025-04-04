import { Link, useLocation } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import { useAlumni } from '../context/AlumniContext';
import { ImProfile } from 'react-icons/im';
import { GiRamProfile } from 'react-icons/gi';
import { RiProfileLine } from 'react-icons/ri';
import { BiUser, BiUserCircle } from 'react-icons/bi';


export default function Navbar() {

    const { student } = useStudent();
    const { alumni } = useAlumni();
    const { pathname } = useLocation();

    return (
        <nav className="fixed w-screen z-20 top-0 start-0 border-b border-gray-200 bg-white">
            <div className="flex justify-between items-center w-full px-2 md:px-32 h-16">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl md:text-3xl font-semibold whitespace-nowrap dark:text-white">AMS</span>
                </a>

                <div className="items-center justify-between hidden md:flex" >
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg gap-1 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                        <Link to="/" className={`block py-1 px-4 ${pathname.endsWith("/") ? "text-blue-600" : "text-gray-900"} rounded-sm hover:bg-gray-100 md:hover:text-blue-600`}>Home</Link>
                        <Link to="/alumni" className={`block py-1 px-4 ${pathname.includes("/alumni") ? "text-blue-600" : "text-gray-900"} rounded-sm hover:bg-gray-100 md:hover:text-blue-600`}>Alumni</Link>
                        <Link to="/posts" className={`block py-1 px-4 ${pathname.includes("/posts") ? "text-blue-600" : "text-gray-900"} rounded-sm hover:bg-gray-100 md:hover:text-blue-600`}>Posts</Link>
                        <Link to="/event" className={`block py-1 px-4 ${pathname.endsWith("/event") ? "text-blue-600" : "text-gray-900"} rounded-sm hover:bg-gray-100 md:hover:text-blue-600`}>Event</Link>
                        <Link to="/gallery" className={`block py-1 px-4 ${pathname.endsWith("/gallery") ? "text-blue-600" : "text-gray-900"} rounded-sm hover:bg-gray-100 md:hover:text-blue-600`}>Gallery</Link>
                        {/* <Link to="/about" className={`block py-1 px-4 ${pathname.endsWith("/about") ? "text-blue-600" : "text-gray-900"} rounded-sm hover:bg-gray-100 md:hover:text-blue-600`}>About</Link> */}
                        {/* <a href="/contact" className={`block py-1 px-4 ${pathname.endsWith("/contact") ? "text-blue-600" : "text-gray-900"} rounded-sm hover:bg-gray-100 md:hover:text-blue-600`}>Contact</a> */}
                    </ul>
                </div>
                <div className="">
                    {
                        student ? <div className='flex items-center gap-3 hover:bg-sky-200 cursor-pointer px-3 py-1 rounded-full'>
                            <img src={student.profileImage} className='h-10 w-10 rounded-full' alt={student.name} />
                            <Link to={"/user/profile/student"} className="">
                                <p className=''>{student.name}</p>
                                <p className='text-xs'>{student.email}</p>
                            </Link>
                        </div> :
                            alumni ? <div className='flex items-center gap-3 hover:bg-sky-200 cursor-pointer px-3 py-1 rounded-full'>
                                <img src={alumni.profileImage} className='h-10 w-10 rounded-full' alt={alumni.name} />
                                <Link to={"/user/profile/alumni"} className="">
                                    <p className=''>{alumni.name}</p>
                                    <p className='text-xs'>{alumni.email}</p>
                                </Link>
                            </div> :
                                <a href={"/user/profile/student?page=student-login"}>
                                    <button className='bg-blue-600 flex gap-2 items-center cursor-pointer font-semibold text-white rounded-md px-4 py-1.5'>
                                        <span>Profile</span>
                                        <BiUserCircle size={25} />
                                    </button>
                                </a>
                    }
                </div>
            </div>
        </nav>
    )
}
