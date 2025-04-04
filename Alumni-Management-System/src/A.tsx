import { Outlet, Route } from 'react-router-dom'
import Routes from './constants/Routes';

export default function A() {
    const a = false;

    if (a)
        return <Outlet />

    return (
        <>
            <Route index Component={COMasad} />
            <Route path='/dark' Component={COMasad} />
        </>
    )
}

function COMasad() {
    return (
        <div>
            <br />
            adsadasdasd
            <br />
            adsadasdasd
            <br />
            adsadasdasd
            <br />
            adsadasdasd
        </div>
    )
}


