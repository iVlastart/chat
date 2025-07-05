import { useEffect } from "react";
import Msg from "../components/Msg";

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
            <div className="w-full">
                <Msg username="as" time="now" msg="Hello, World!" isDelivered={true}/>
                <Msg username="as" time="now" msg="Hello, World!" isDelivered={true}/>
            </div>
            
        </>
    );
}