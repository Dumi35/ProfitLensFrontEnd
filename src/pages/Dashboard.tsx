import { Box, IconButton, InputAdornment, LinearProgress, Paper, Stack, TextField, Toolbar, Typography, Alert } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import UserDrawer, { DRAWERWIDTH } from "@profitlens/components/user/drawer";
import { PromptAISetup, LanguageModel } from "@profitlens/utilities/AIPrompt.ts";
import { Writer, WriterAISetup } from "@profitlens/utilities/AIWriter";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from 'react-markdown';
import AddIcon from '@mui/icons-material/Add';
import FeaturesFormDialog from "@profitlens/components/user/dashboard/FeaturesForm";

interface Message {
    id: string;
    sender: 'user' | 'profitLensBot';
    text: string;
}

function SendIconComponent() {
    return (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.25227 8.34125C3.92727 5.42375 6.93102 3.28125 9.58477 4.53875L24.5148 11.6113C27.3748 12.965 27.3748 17.035 24.5148 18.3888L9.58477 25.4625C6.93102 26.72 3.92852 24.5775 4.25227 21.66L4.85227 16.25H14.9998C15.3313 16.25 15.6492 16.1183 15.8837 15.8839C16.1181 15.6495 16.2498 15.3315 16.2498 15C16.2498 14.6685 16.1181 14.3505 15.8837 14.1161C15.6492 13.8817 15.3313 13.75 14.9998 13.75H4.85352L4.25227 8.34125Z" fill="#00370D" />
        </svg>
    )
}

export default function Dashboard() {

    const promptInputRef = useRef<HTMLInputElement | null>(null);
    const promptFormRef = useRef<HTMLFormElement | null>(null);

    const [messages, setMessages] = useState<Message[]>([]);
    const [loadingResponse, setLoadingResponse] = useState(false)

    const PromptSession = useRef<LanguageModel | undefined>();
    const AIWriter = useRef<Writer | undefined>();

    const [errorMessage, setErrorMessage] = useState<string>()

    // constants related to the features form
    const [dialogOpen, setDialogOpen] = useState(false);
    const [responseData, setResponseData] = useState(null);

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleDialogSubmit = (response: any) => {
        console.log('Response received from dialog:', response);
        setResponseData(response); // Save the response in the state
        console.log('features res', responseData)
    };

    async function promptAI(event: React.FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault()
            if (loadingResponse || errorMessage != null) {
                return
            }
            setLoadingResponse(true)
            const formData = new FormData(event.currentTarget as HTMLFormElement);
            const formJson = Object.fromEntries(formData.entries());

            // const promptMessage = formJson['prompt-message'].toString()
            const promptMessage: Message = {
                id: `user-${Date.now()}`,
                sender: 'user',
                text: formJson['prompt-message'].toString()
            }

            //reset all form inputs
            promptFormRef.current?.reset()

            setMessages((prev) => [...prev, promptMessage])

            //send the message to the prompt api
            const responseMessage: Message = {
                id: `bot-${Date.now()}`,
                sender: 'profitLensBot',
                text: await PromptSession.current?.prompt(promptMessage.text) ?? ''
            }
            setMessages((prev) => [...prev, responseMessage])
            // console.log('number of tokens', PromptSession)

        } catch (e) {
            console.error(e)
            setErrorMessage('PromptAPI is unavailable. Please try again later')
            // console.log('error number of tokens', PromptSession)
        } finally {
            setLoadingResponse(false)
        }
    }

    useEffect(() => {
        WriterAISetup().then(async (res) => {
            AIWriter.current = res
        }).catch((e) => {
            console.error(e)
        })
        PromptAISetup().then(async (res: LanguageModel) => {
            console.log('setup res', res)
            PromptSession.current = res;
        }).catch((error: any) => {
            setErrorMessage('PromptAPI is unavailable. Please try again later')
            console.error('setup error', error)
        })
        const listener = (event: KeyboardEvent) => {
            if (event.key === "Enter" || event.key === "NumpadEnter") {
                // for medium sized screens e.g tablet and above
                const isMediumSized = window.matchMedia('(min-width: 900px)').matches;

                if (isMediumSized) {
                    if (!event.shiftKey) {
                        // Submit form on Enter for laptop/desktop
                        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
                        promptFormRef.current?.dispatchEvent(submitEvent);
                        event.preventDefault();
                    }
                }
            }
        };

        promptInputRef.current?.addEventListener("keydown", listener);
        return () => {
            promptInputRef.current?.removeEventListener("keydown", listener);
        };
    }, []);

    return (
        <Box display={"flex"}>
            <UserDrawer />
            <Stack sx={{
                paddingInline: '4%', gap: "20px", flexDirection: "column", position: "relative",
                flexGrow: 1, width: { sm: `calc(100% - ${DRAWERWIDTH}px)` }
            }}
                component="main"
            >
                <Toolbar />
                <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                    <BarChart
                        series={[
                            { data: [35, 44, 24, 34] },
                            { data: [51, 6, 49, 30] },
                            { data: [15, 25, 30, 50] },
                            { data: [60, 50, 15, 25] },
                        ]}
                        height={290}
                        xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
                        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                    />
                    <Box>
                        <Stack flexBasis="500px" flexGrow={1} spacing="1rem">
                            <Typography variant="subtitle1">Summary</Typography>
                            <Typography variant="body1">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum totam sunt vel laudantium nobis velit, aut ducimus esse ea deleniti consequatur quibusdam consectetur modi atque quasi nemo tenetur quia aliquid.
                            </Typography>
                        </Stack>
                    </Box>
                    <Box>
                        <Stack flexBasis="500px" flexGrow={1} spacing="1rem">
                            <Typography variant="subtitle1">Gain insights into market with AI</Typography>
                            <Typography variant="body1">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum totam sunt vel laudantium nobis velit, aut ducimus esse ea deleniti consequatur quibusdam consectetur modi atque quasi nemo tenetur quia aliquid.
                            </Typography>
                        </Stack>
                    </Box>
                </Box>
                {/* messages */}
                <Box>
                    {messages.map((message) => (
                        <Box
                            key={message.id}
                            sx={{
                                display: 'flex',
                                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                                mb: 1,
                            }}
                        >
                            <Paper
                                elevation={2}
                                sx={{
                                    p: 1,
                                    maxWidth: '75%',
                                    bgcolor: message.sender === 'user' ? 'primary.100' : 'grey.100',
                                }}
                            >
                                {
                                    message.sender === 'user' ? <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>{message.text}</Typography> : <ReactMarkdown>{message.text}</ReactMarkdown>
                                }

                            </Paper>
                        </Box>
                    ))}
                </Box>
                {
                    loadingResponse &&
                    <Stack gap={2} width={'75%'}>
                        <LinearProgress sx={{ width: '100%' }} />
                        <LinearProgress sx={{ width: '75%' }} />
                        <LinearProgress sx={{ width: '45%' }} />
                    </Stack>
                }
                {
                    errorMessage &&
                    <Alert severity="error">{errorMessage}</Alert>
                }
                <FeaturesFormDialog
                    open={dialogOpen}
                    onClose={handleCloseDialog}
                    onSubmit={handleDialogSubmit}
                />
                <Toolbar />
            </Stack>

            <Box sx={{
                position: "fixed",
                paddingInline: '5%',
                bottom: 0,
                left: "auto",
                right: 0,
                width: { xs: "100%", md: `calc(100% - ${DRAWERWIDTH}px)` },
                ml: { md: `${DRAWERWIDTH}px` },
                paddingBottom: '1rem',
                backgroundColor: 'background.default'
            }} component={'form'} onSubmit={((event: React.FormEvent<HTMLFormElement>) => { promptAI(event) })} id='prompt-form' ref={promptFormRef}>


                <TextField name='prompt-message'
                    id='prompt-message'
                    ref={promptInputRef}
                    placeholder="Enter prompt" fullWidth sx={{

                        '& .MuiInputBase-root': {
                            paddingInline: 1,
                        }
                    }}

                    multiline
                    maxRows={3}
                    slotProps={{
                        input: {
                            startAdornment:
                                <InputAdornment position="end">
                                    <IconButton disabled={loadingResponse || errorMessage != null} sx={{ background: 'none' }}>
                                        <AddIcon color="primary" onClick={handleOpenDialog} />
                                    </IconButton>
                                </InputAdornment>,
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton type="submit" disabled={loadingResponse || errorMessage != null}>
                                        <SendIconComponent />
                                    </IconButton>
                                </InputAdornment>
                        }
                    }}
                />
            </Box>


        </Box>


    )
}