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
    const [msgs, setMsgs] = useState<MsgProps[]>([]);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    useEffect(()=>{
        const sock = new WebSocket("http://127.0.0.1:6969");
        setSocket(sock);

        sock.onmessage = function(event) {
        const raw = event.data as string;
        const strJSON = raw.replace(/^Echo:\s*/, "");

        try
        {
            const data = JSON.parse(strJSON);
            console.log(`${data.username} said "${data.msg}"`);
            setMsgs((prev)=>[
                ...prev,
                {
                   username: data.username,
                    msg: data.msg,
                    time: new Date().toLocaleTimeString()
                }
            ]);
        }
        catch(e: any)
        {
            throw new Error("invalid json ", e);
        }
        
    };

        return () => {
            sock.close();
        };
    }, []);
    async function getMsgs()
    {
        const resp = await fetch('http://127.0.0.1:8080/getMsgs',{
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });
        if(!resp.ok)
            throw new Error("getMsgs error");
        
        const data = await resp.json();
        data.forEach((msg:any)=>{
            setMsgs((prev)=>[
                ...prev,
                {
                    username: msg['Username'],
                    msg: msg['Msg'],
                    time: msg['Time']
                }
            ])
        });
    }
    
    useEffect(()=>{
        getMsgs();
    }, []);

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
                {socket && <NewMsg socket={socket} />}
            </div>
        </>
    );
}