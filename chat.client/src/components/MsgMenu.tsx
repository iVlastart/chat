interface MsgMenuProps
{
    username: string,
    msg: string,
}
export default function MsgMenu({username, msg}:MsgMenuProps)
{
    async function copy()
    {
        await navigator.clipboard.writeText(msg);
    }

    async function deleteMsg()
    {
        const resp = await fetch('http://127.0.0.1:8080/deleteMsg',{
            method: 'POST'
        });

        if(!resp.ok)
            throw new Error('DeleteMsg fetch error');
    }
    return(
        <div className="relative top-full right-0 mt-2 z-10 divide-y rounded-lg shadow-sm w-40 bg-gray-700 divide-gray-600">
            <ul className="py-2 text-sm  dark:text-gray-200">
                <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Reply</button></li>
                <li><button onClick={copy} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Copy</button></li>
                <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Report</button></li>
                {username===sessionStorage.getItem('username')
                    ?<li><button onClick={deleteMsg} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Delete</button></li>:""}
            </ul>
        </div>
    )
}