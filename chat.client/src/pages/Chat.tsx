import Msg from "../components/Msg";

export default function Chat()
{
    return(
        <>
            <div className="w-full">
                <Msg username="as" time="now" msg="Hello, World!" isDelivered={true}/>
            </div>
            
        </>
    );
}