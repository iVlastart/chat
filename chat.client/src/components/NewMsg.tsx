import TextField from "@mui/material/TextField";
import Send from "@mui/icons-material/Send"

 
export function NewMsg() {
  return (
      <div className="w-[75vw] flex flex-row">
        <TextField id="outlined-basic" label="Message" variant="outlined" className="w-full" />
        <button className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
        <Send/>
      </button>
      </div>

  );
}