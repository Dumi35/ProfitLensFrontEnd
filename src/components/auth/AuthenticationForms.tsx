import { Dialog, DialogContent, Box, Stack, TextField, Typography, Button, InputAdornment, IconButton } from "@mui/material";
import brandmarkLogo from "../../assets/images/brandmarkLogo.png"
import { useEffect, useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { SERVER_URL } from "@profitlens/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import useAuth from "@profitlens/context/authContext";


export default function AuthenticationForms({ open, onClose, value }: { open: boolean; onClose: () => void; value: number }) {
    const [formValue, setFormValue] = useState(value);

    const handleChange = (newValue: number) => {
        setFormValue(newValue);
    };

    useEffect(() => {
        setFormValue(value);
    }, [value]);

    const [showPassword, setShowPassword] = useState(false);

    // const { login } = useAuth();
    const navigate = useNavigate()

    function signUp(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const formJson = Object.fromEntries(formData.entries())
        // console.log(formJson)
        axios.post(`${SERVER_URL}/api/auth/sign-up`, formJson).then(async (res) => {
            console.log(res.data)
            navigate('dashboard',{state:{email:formJson.email}})
            // await login(res.data);
        }).catch((e) => {
            console.error(e)
        })
    }

    function logIn(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const formJson = Object.fromEntries(formData.entries())

        axios.post(`${SERVER_URL}/api/auth/login`, formJson).then(async (res) => {
            console.log(res.data)
            navigate('dashboard',{state:{email:formJson.email}}) 
            // await login(res.data);
        }).catch((e) => {
            console.error(e)
        })
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                {/* login form */}
                {
                    formValue == 0 &&
                    <>
                        <Stack gap={2} alignItems={"center"} padding={"3vw"} component={"form"} onSubmit={logIn}>
                            <Box component={"img"} src={brandmarkLogo} loading="eager" />
                            <Typography variant="h4" textAlign={"center"}>Good to See You Again!</Typography>
                            <TextField placeholder="Your email address" fullWidth type="email" name='email' required />
                            <TextField placeholder="Password" fullWidth required name="password"
                                type={showPassword ? "text" : "password"}
                                slotProps={{
                                    htmlInput: { minLength: 8 },
                                    input: {

                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    onMouseDown={(e) => e.preventDefault()}
                                                    color="primary"
                                                    sx={{ bgcolor: 'background.default' }}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                            />
                            <Typography variant="body1" onClick={() => { handleChange(1) }}>
                                Don’t have an account?
                                <span style={{ cursor: "pointer", textDecoration: "underline", paddingLeft: "5px" }}>
                                    Sign up
                                </span>
                            </Typography>
                            <Button variant="contained" type='submit'>Log in</Button>
                        </Stack>
                    </>
                }

                {/* sign up form */}
                {
                    formValue == 1 &&
                    <>
                        <Stack gap={2} alignItems={"center"} padding={"3vw"} component={"form"} onSubmit={signUp}>
                            <Box component={"img"} src={brandmarkLogo} loading="eager" />
                            <Typography variant="h4" textAlign={"center"}>Take the First Step</Typography>
                            <TextField placeholder="Username" fullWidth name="username" required
                                slotProps={{
                                    htmlInput: { minLength: 4 }
                                }}
                            />
                            <TextField placeholder="Your email address" fullWidth type="email" name="email" required />
                            <TextField placeholder="Password" fullWidth required name="password"
                                type={showPassword ? "text" : "password"}
                                slotProps={{
                                    htmlInput: { minLength: 8 },
                                    input: {

                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    onMouseDown={(e) => e.preventDefault()}
                                                    color="primary"
                                                    sx={{ bgcolor: 'background.default' }}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                            />

                            <Typography variant="body1" onClick={() => { handleChange(0) }}>
                                Already have an account?
                                <span style={{ cursor: "pointer", textDecoration: "underline", paddingLeft: "5px" }}>
                                    Log in
                                </span>
                            </Typography>
                            <Button variant="contained" type='submit'>Sign up</Button>
                        </Stack>
                    </>
                }

            </DialogContent>
        </Dialog >
    )
}