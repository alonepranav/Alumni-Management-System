import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-5xl font-bold text-rose-500">This page not exist</h1>
            <br />
            {/* <p className="text-xl text-gray-700 mt-2">Page Not Found</p> */}
            <br />
            <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;