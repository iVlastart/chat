import { useEffect } from "react";
import Msg from "../components/Msg";
import { NewMsg } from "../components/NewMsg";


export default function Chat()
{
    const socket = new WebSocket("http://127.0.0.1:6969");
    socket.onopen = ()=>{
        socket.send('Hello, Server!');
    };
    useEffect(()=>{
        socket.OPEN;
    });
    return(
        <>
            <div className="w-full h-[62.5vh]">
                <Msg username="as" time="now" msg="Hello, World!"/>
                <Msg username="as" time="now" msg="Hello, World!"/>
            </div>
            <div className="w-full">
                <NewMsg/>
            </div>
        </>
    );
}