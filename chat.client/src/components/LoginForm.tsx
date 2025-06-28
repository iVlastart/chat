interface LoginFormProps
{
    isLogin:boolean
    onSubmit:any
}

export default function LoginForm({isLogin, onSubmit}:LoginFormProps)
{

    const sendData=(e:any)=>{
        e.preventDefault();
        const username:string = e.target.txtUsername.value;
        const password:string = e.target.pswPassword.value;
        onSubmit(username, password);
    }
    return(
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        {isLogin ? "Login to your account!" : "Signin to your account"}
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST" onSubmit={sendData}>
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