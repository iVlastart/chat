import TextField from "@mui/material/TextField";
import Send from "@mui/icons-material/Send"

 
export function NewMsg() {
  async function submit(msg:string)
  {
    const resp = await fetch(`http://127.0.0.1:8080/addMsg/${msg}`,{
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
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
    const msg:string = (form.elements.namedItem('msg') as HTMLInputElement).value;
    submit(msg);
  };
  return (
      <form className="w-[75vw] flex flex-row" onSubmit={sendData}>
          <TextField id="msg" label="Message" variant="outlined" className="w-full"
            inputProps={{ maxLength: 255 }} />
          <button className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
            <Send/>
          </button>
      </form>

  );
}