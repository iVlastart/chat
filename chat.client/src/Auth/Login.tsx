import LoginForm from "../components/LoginForm";

export default function Login()
{
    return(
        <>
            <title>Chat App / Login</title>
            <div className="flex flex-col items-center justify-center">
                <LoginForm isLogin={true} />
            </div>
        </>
    );
}