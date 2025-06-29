import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps
{
    isLogin:boolean
}

export default function LoginForm({isLogin}:LoginFormProps)
{
    const nav = useNavigate();
    const submit = async (username:string, password:string)=>{
        try
        {
            const resp = await fetch(`http://127.0.0.1:8080/${isLogin?"login":"signin"}`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password})
            });

            if(!resp.ok)
            {
                const err = await resp.json();
                console.log("Resp error: "+err);
                return;
            }

            const data = await resp.json();

            if(data.success) nav('/');

            sessionStorage.setItem('username', username);
        }
        catch(err)
        {
            console.log("submit error: "+err);
        }
    };
    const sendData=(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const username:string = (form.elements.namedItem('txtUsername') as HTMLInputElement).value;
        const password:string = (form.elements.namedItem('pswPassword') as HTMLInputElement).value;
        submit(username,password);
    }

    useEffect(()=>{
        if(sessionStorage.getItem('username')) nav('/');
    });
    return(
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        {isLogin ? "Login to your account!" : "Signin to your account"}
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" method="POST" onSubmit={sendData}>
                        <div>
                            <div className="mt-2">
                                <input type="text" id="txtUsername" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <div className="mt-2">
                                <input type="password" id="pswPassword" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" 
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                {isLogin ? "Login" : "Signin"}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        {isLogin ? "Not a member" : "Already have an account"}?&nbsp;
                        <a href={isLogin ? "/signin" : "/login"} className="font-semibold text-indigo-600 hover:text-indigo-500">
                            {isLogin ? "Signin" : "Login"}
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}