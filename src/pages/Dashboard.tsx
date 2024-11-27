import { IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import LangDetect from "@profitlens/utilities/LangDetect";
import AIPrompt from "@profitlens/utilities/AIPrompt.ts";
import SendIcon from "../assets/icons/send-fill.svg"

function SendIconComponent() {
    return (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.25227 8.34125C3.92727 5.42375 6.93102 3.28125 9.58477 4.53875L24.5148 11.6113C27.3748 12.965 27.3748 17.035 24.5148 18.3888L9.58477 25.4625C6.93102 26.72 3.92852 24.5775 4.25227 21.66L4.85227 16.25H14.9998C15.3313 16.25 15.6492 16.1183 15.8837 15.8839C16.1181 15.6495 16.2498 15.3315 16.2498 15C16.2498 14.6685 16.1181 14.3505 15.8837 14.1161C15.6492 13.8817 15.3313 13.75 14.9998 13.75H4.85352L4.25227 8.34125Z" fill="#00370D" />
        </svg>
    )
}

export default function Dashboard() {

    function detectLanguage(event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) {
        // event.preventDefault();
        if ('key' in event && event?.key === 'Enter') {
            const inputValue = (event.target as HTMLInputElement).value;
            console.log('Input value:', inputValue);
            // LangDetect(inputValue)
            AIPrompt()
            // Call your language detection logic here
        } else if ('button' in event) {
            // const inputValue = (event.target as HTMLInputElement).value;
            // console.log('Input value:', inputValue);
            console.log('Input value:', 'ji');
            // LangDetect(inputValue)
            // Call your language detection logic here
        }
    }

    return (
        <>
            <TextField placeholder="Enter prompt" onKeyDown={(event:React.KeyboardEvent<HTMLInputElement>) => detectLanguage(event)} fullWidth sx={{
                '& .MuiInputBase-root':{
                    paddingRight:1
                }
            }}
                slotProps={{
                    input: {
                        endAdornment:
                            <InputAdornment position="end">
                                <IconButton onClick={(event:React.MouseEvent<HTMLButtonElement>) => {detectLanguage(event)}}>
                                    <SendIconComponent />
                                </IconButton>
                            </InputAdornment>
                    }
                }}
            />

        </>
    )
}