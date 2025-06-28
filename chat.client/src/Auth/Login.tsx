import LoginForm from "../components/LoginForm";

export default function Login()
{
    const handleLogin = ()=>{
        
    }
    return(
        <>
            <div className="flex flex-col items-center justify-center">
                <LoginForm isLogin={true} onSubmit={handleLogin}/>
            </div>
        </>
    );
}