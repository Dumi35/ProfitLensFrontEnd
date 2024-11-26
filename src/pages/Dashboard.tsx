import { TextField, Typography } from "@mui/material";
import LangDetect from "@profitlens/utilities/LangDetect";


export default function Dashboard() {

    function detectLanguage(event: React.KeyboardEvent<HTMLInputElement>) {
        // event.preventDefault();
        if (event.key === 'Enter') {
            const inputValue = (event.target as HTMLInputElement).value;
            console.log('Input value:', inputValue);
            // LangDetect(inputValue)
            // Call your language detection logic here
        }
    }



    return (
        <>
            <Typography>hello peeps</Typography>
            <TextField placeholder="Enter prompt" onKeyDown={detectLanguage} fullWidth/>
        </>
    )
}