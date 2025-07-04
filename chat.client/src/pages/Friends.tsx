import { useEffect, useState } from "react";
import Friend from "../components/Friend";

interface FriendData {
    Username: string;
}
export default function Friends()
{
    const [friends, setFriends] = useState<FriendData[]>([]);
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

        const data = await resp.json();
        setFriends(data.usernames);
    }

    useEffect(()=>{
        getFriends();
    },[]);
    return(
        <>
           <div>
            {friends.map((friend, index)=>(
                <Friend key={index} username={friend.Username} isOnline={false} lastSeen="today"/>
            ))}
            </div> 
        </>
    );
}