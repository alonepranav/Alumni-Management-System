import { HiOutlineDotsVertical } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import PostType from "../types/Post.types";


export default function MyPostBox({ data, DeletePosts }: { data: PostType, DeletePosts: (id: string) => {} }) {
    const [options, setOptions] = useState(false);
    const optionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) setOptions(false);
        };
        const handleEscapePress = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOptions(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscapePress);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscapePress);
        };
    }, []);

    return (
        <div className="relative px-5 py-3 border border-slate-200 rounded-lg mb-4">
            {options ? (
                <div ref={optionsRef} className="absolute right-2 top-12">
                    <button onClick={() => DeletePosts(data._id)} className="bg-rose-500 px-5 py-1.5 text-sm text-white font-semibold text-center rounded-md">Delete</button>
                </div>
            ) : null}

            <p onClick={() => setOptions(!options)} className="absolute right-2 top-2 hover:bg-stone-200 cursor-pointer rounded-full p-2">
                <HiOutlineDotsVertical size={20} />
            </p>

            <p className="text-xl font-semibold">{data.title} - {new Date(data.time).toLocaleDateString()}</p>
            {data.imageId !== "none" && (
                <div className="mt-3 flex justify-center w-full bg-slate-50 rounded-xl p-2">
                    <img src={data.imageId} className="h-80" />
                </div>
            )}
            <p className="mt-3">{data.content}</p>
        </div>
    );
};