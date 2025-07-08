import TextField from "@mui/material/TextField";
import Send from "@mui/icons-material/Send"

interface NewMsgProps
{
  socket: WebSocket
}
export function NewMsg({socket}:NewMsgProps) {
  async function submit(username:string, msg:string)
  {
    const resp = await fetch(`http://127.0.0.1:8080/addMsg`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, msg})
    });

    if(!resp.ok)
    {
      const err = await resp.json();
      console.error('Resp error: '+err);
      return;
    }
  }
  const sendData = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const username = sessionStorage.getItem('username') as string;
    const msg:string = (form.elements.namedItem('msg') as HTMLInputElement).value;
    const data={
      username: username,
      msg: msg
    }
    socket.send(JSON.stringify(data));

    submit(username, msg);
    (form.elements.namedItem('msg') as HTMLInputElement).value = "";
  };
  return (
      <form className="w-[75vw] flex flex-row" onSubmit={sendData}>
          <TextField id="msg" label="Message" variant="outlined" className="w-full" autoComplete="off"  inputProps={{ maxLength: 255 }} />
            <button className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
            <Send/>
          </button>
      </form>

  );
}