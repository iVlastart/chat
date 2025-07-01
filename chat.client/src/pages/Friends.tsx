import { useEffect } from "react";

export default function Friends()
{
    const getFriends = async ()=>{
        const resp = await fetch(`http://127.0.0.1:8080/friends/${sessionStorage.getItem('username')}`,{
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        });

        if(!resp.ok)
        {
            console.error("resp error");
            return;
        }

        //why this can't be a single line 😭
        const raw_data = await resp.json();
        const data = JSON.stringify(raw_data);
        
        alert(data);
    }

    useEffect(()=>{
        getFriends();
    });
    return(
        <>
            
        </>
    );
}