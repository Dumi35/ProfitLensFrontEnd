import { Dialog, DialogContent, Box, Stack, TextField, Typography, Button } from "@mui/material";
import brandmarkLogo from "../../assets/images/brandmarkLogo.png"
import { useEffect, useState } from "react";

export default function AuthenticationForms({ open, onClose, value }: { open: boolean; onClose: () => void; value: number }) {
    const [formValue, setFormValue] = useState(value);

    const handleChange = (newValue: number) => {
        setFormValue(newValue);
    };

    useEffect(() => {
        setFormValue(value);
    }, [value]);


    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                {/* login form */}
                {
                    formValue == 0 &&
                    <>
                        <Stack gap={2} alignItems={"center"} padding={"3vw"}>
                            <Box component={"img"} src={brandmarkLogo} loading="eager" />
                            <Typography variant="h4" textAlign={"center"}>Good to See You Again!</Typography>
                            <TextField placeholder="Your email address" fullWidth type="email" />
                            <TextField placeholder="Password" fullWidth type="password" />
                            <Typography variant="body1" onClick={() => { handleChange(1) }}>
                                Don’t have an account?
                                <span style={{ cursor: "pointer", textDecoration: "underline", paddingLeft: "5px" }}>
                                    Sign up
                                </span>
                            </Typography>
                            <Button variant="contained">Log in</Button>
                        </Stack>
                    </>
                }

                {/* sign up form */}
                {
                    formValue == 1 &&
                    <>
                        <Stack gap={2} alignItems={"center"} padding={"3vw"}>
                            <Box component={"img"} src={brandmarkLogo} loading="eager" />
                            <Typography variant="h4" textAlign={"center"}>Take the First Step</Typography>
                            <TextField placeholder="Your email address" fullWidth type="email" />
                            <TextField placeholder="Password" fullWidth type="password" />
                            <Typography variant="body1" onClick={() => { handleChange(0) }}>
                                Already have an account?
                                <span style={{ cursor: "pointer", textDecoration: "underline", paddingLeft: "5px" }}>
                                    Log in
                                </span>
                            </Typography>
                            <Button variant="contained">Sign up</Button>
                        </Stack>
                    </>
                }

            </DialogContent>
        </Dialog >
    )
}