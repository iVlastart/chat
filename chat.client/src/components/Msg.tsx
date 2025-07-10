import { useState } from "react";
import pfp from '../../public/defaultpfp.jpg';
import MsgMenu from "./msgMenu";

interface MsgProps
{
    username:string,
    time: string,
    msg: string,
}
export default function Msg({username, time, msg}:MsgProps)
{
    const [isOpen, setIsOpen] = useState(false);
    return(
        <div className="flex items-start gap-2.5 mb-2.5">
            <img className="w-8 h-8 rounded-full" src={pfp} alt="Profile Picture"/>
            <div className="flex flex-col w-full max-w-[720px] leading-1.5 p-4 rounded-e-xl rounded-es-xl ">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold ">
                        {username}
                    </span>
                    <span className="text-sm font-normal ">
                        {time}
                    </span>
                </div>
                <p className="text-sm font-normal py-2.5 ">
                    {msg}
                </p>
            </div>
            <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" 
                    data-dropdown-placement="bottom-start" 
                    className="p-2 text-sm"
                            type="button"
                    onClick={()=>setIsOpen(!isOpen)}>
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                    <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                </svg>
            </button>
            {isOpen &&
                <MsgMenu username={username} msg={msg}/>
            }
        </div>
    );
}