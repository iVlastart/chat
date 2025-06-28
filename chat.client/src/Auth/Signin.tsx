import LoginForm from "../components/LoginForm";

export default function Signin()
{

    return(
        <>
            <title>Chat App / Signin</title>
            <div className="flex flex-col items-center justify-center">
                <LoginForm isLogin={false}/>
            </div>
        </>
    );
}