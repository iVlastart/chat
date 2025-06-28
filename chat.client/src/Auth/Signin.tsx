import LoginForm from "../components/LoginForm";

export default function Signin()
{
    const handleSignin = async (username:string,password:string)=>{
        try
        {
            const resp = await fetch("http://127.0.0.1:8080/signin",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password})
            });

            if(!resp.ok)
            {
                console.log(await resp.json());
                return;
            }
        }
        catch(err)
        {
            console.log("Signin error "+err);
        }
    }

    return(
        <>
            <div className="flex flex-col items-center justify-center">
                <LoginForm isLogin={false} onSubmit={handleSignin}/>
            </div>
        </>
    );
}