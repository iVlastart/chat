import { useEffect, useState } from "react";
import Msg from "../components/Msg";
import { NewMsg } from "../components/NewMsg";

interface MsgProps
{
    username: string,
    msg: string,
    time: string
}
export default function Chat()
{
    async function getMsgs()
    {
        const resp = await fetch('http://127.0.0.1:8080/getMsgs',{
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });

        if(!resp.ok)
            throw new Error("getMsgs error");
        
        
    }
    const [msgs, setMsgs] = useState<MsgProps[]>([]);
    const socket = new WebSocket("http://127.0.0.1:6969");
    useEffect(()=>{
        socket.OPEN;
        getMsgs();
    });

    socket.onmessage = function(event) {
    const raw = event.data as string;

    const strJSON = raw.replace(/^Echo:\s*/, "");

    try
    {
      const data = JSON.parse(strJSON);
      
      setMsgs((prev)=>[
        ...prev,
        {
            username: data.username,
            msg: data.msg,
            time: new Date().toLocaleTimeString()
        }
      ])
    }
    catch(e: any)
    {
      throw new Error("invalid json ", e);
    }
};
    return(
        <>
            <div className="w-full h-[62.5vh] overflow-y-auto">
                {
                    msgs.map((data, i)=>(
                        <Msg key={i} username={data.username} msg={data.msg} time={data.time}/>
                    ))
                }
            </div>
            <div className="w-full">
                <NewMsg socket={socket}/>
            </div>
        </>
    );
}