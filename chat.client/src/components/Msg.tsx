import { useState } from "react";
import pfp from '../../public/defaultpfp.jpg';

interface MsgProps
{
    username:string,
    time: string,
    msg: string,
    isDelivered: boolean
}
export default function Msg({username, time, msg, isDelivered}:MsgProps)
{
    const [isOpen, setIsOpen] = useState(false);
    return(
        <div className="flex items-start gap-2.5 mb-2.5">
            <img className="w-8 h-8 rounded-full" src={pfp} alt="Jese image"/>
            <div className="flex flex-col w-full max-w-[720px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {username}
                    </span>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        {time}
                    </span>
                </div>
                <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                    {msg}
                </p>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {isDelivered ? "Delivered" : ""}
                </span>
            </div>
            <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" 
                    data-dropdown-placement="bottom-start" 
                    className="p-2 text-sm text-gray-900 bg-white rounded-lg hover:bg-gray-100 dark:text-white dark:bg-gray-900 dark:hover:bg-gray-800"
                            type="button"
                    onClick={()=>setIsOpen(!isOpen)}>
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                    <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                </svg>
            </button>
            {isOpen && (
                <div className="relative top-full right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-40 dark:bg-gray-700 dark:divide-gray-600">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Reply</button></li>
                        <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Forward</button></li>
                        <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Copy</button></li>
                        <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Report</button></li>
                        <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Delete</button></li>
                    </ul>
                </div>
            )}
        </div>
    );
}