import { useEffect, useState } from 'react';
import Routes from '../../constants/Routes';
import axios from 'axios';
import { Link } from 'react-router-dom';

type Alumni_Type = {
    _id: string;
    name: string;
    email: string;
    password: string;
    batch: string;
    company: string;
    designation: string;
    linkedin: string;
    bio: string;
    achievements: string;
    profileImage: string;
}

export default function Alumni() {
    const [alumni, setAlumni] = useState<Alumni_Type[]>([]);

    useEffect(() => {
        const getAlumniData = async () => {
            const res = await axios.get(Routes.Alumni_Get_All_Alumni());
            console.log(res)
            if (res.data.success) {
                setAlumni(res.data.users)
            } else { }
        }

        getAlumniData();
    }, []);

    return (
        <div className="p-5 py-24">
            <h2 className="text-4xl font-bold text-blue-500 tracking-wide mb-10 text-center">Our Alumni</h2>
            <div className="flex gap-4 px-28">
                {alumni.map((data, index) => <Alumni_Box data={data} key={index} />)}
            </div>
        </div>
    );
}


function Alumni_Box({ data }: { data: Alumni_Type }) {
    return <div className="p-4 border rounded-3xl border-slate-200 hover:shadow-xl hover:shadow-gray-100 min-h-96 w-72">
        <div className="h-44 w-full rounded-full flex justify-center overflow-hidden p-5 items-center">
            <img src={data.profileImage} alt={data.name} className='h-44 w-44 p-2 object-contain rounded-full border border-slate-200' />
        </div>
        <Link to={`profile/${data._id}`} className="text-xl font-semibold mt-3">{data.name} <span className='text-base font-normal'>( {data.batch} )</span></Link>
        <p className="mt-1 text-gray-500">{data.designation} at {data.company}</p>
        <p className="mt-1 text-gray-600">{data.bio}</p>
        <p className='mt-1 font-semibold text-gray-600'>Achievements</p>
        <ul className='pl-6 text-sm' style={{ listStyleType: "disc" }}>
            {data.achievements.split(",").map(a => <li key={a}>{a}</li>)}
        </ul>
        {data._id}
        <div className="mt-3">
            <p className='text-sm font-semibold'>Contact</p>
            <div className="flex gap-5 mt-1 items-center">
                <a href={data.linkedin} target='_blank'>
                    <img src='/alumni/linkedin.png' alt={data.name} className='h-9 w-9' />
                </a>
                <a href={`mailto:${data.email}`} target='_blank'>
                    <img src='/alumni/gmail.png' alt={data.name} className='h-9 w-9' />
                </a>
            </div>
        </div>

    </div>
}