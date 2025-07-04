interface FriendProps
{
    username: string,
    isOnline: boolean,
    lastSeen: string
}

export default function Friend({username, isOnline, lastSeen}:FriendProps)
{
    return (
        <>
            <ul role="list" className="divide-y divide-gray-100">
                <li className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        <img className="size-12 flex-none rounded-full bg-gray-50" 
                            src="../../public/defaultpfp.jpg" alt="Profile Picture" />
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm/6 font-semibold text-gray-900">
                                {username}
                            </p>
                        </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm/6 text-gray-900">
                            {isOnline ? "online" : "offline"}
                        </p>
                        <p className="mt-1 text-xs/5 text-gray-500">
                            Last seen&nbsp;
                            <time dateTime="2023-01-23T13:23Z">
                                {lastSeen}  
                            </time>
                        </p>
                    </div>
                </li>
            </ul>

        </>
    );
}