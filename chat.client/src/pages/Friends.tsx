import { useEffect } from "react";

export default function Friends()
{
    const getFriends = async ()=>{
        const resp = await fetch(`http://127.0.0.1/friends/${sessionStorage.getItem('username')}`,{
            method: 'GET',
            
        });
    }

    useEffect(()=>{

    });
    return(
        <>
            
        </>
    );
}