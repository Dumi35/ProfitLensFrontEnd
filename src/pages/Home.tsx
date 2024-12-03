import { Stack, Typography, Button, Box, Card, CardContent } from "@mui/material";
// import StarIcon from "../assets/icons/ph_star-four-fill.svg"
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { useTheme } from "@mui/material/styles";
import heartIcon from "@profitlens/assets/icons/solar_heart-broken.svg"
import appsIcon from "@profitlens/assets/icons/apps.svg"
import graph from "@profitlens/assets/images/graph.svg"
import logo from "@profitlens/assets/images/logo.png"
import brandmarkLogo from "@profitlens/assets/images/brandmarkLogo.png"
import AuthenticationForms from "@profitlens/components/auth/AuthenticationForms";
import { useState } from "react";

export default function HomePage() {
    const theme = useTheme()
    const [openAuthForm, setOpenAuthForm] = useState(false)
    const [formToOpen, setFormToOpen] = useState(0)
   
    const handleCloseAuthForm = () => setOpenAuthForm(false);


    const handleOpenAuthForm = (formType: number) => {
        setFormToOpen(formType); 
        setOpenAuthForm(true); // Open the dialog
    };
    
    return (
        <>
            <Box component="header" paddingBlock="1vh">
                <Stack component="nav" direction="row" justifyContent={"space-between"} alignItems={"center"}>
                    <Box component={"img"} src={logo} width="250px" loading="eager" display={{ xs: "none", md: "block" }} />
                    <Box component={"img"} src={brandmarkLogo} loading="eager" display={{ xs: "block", md: "none" }} />
                    <Stack direction={"row"} gap={1}>
                        <Button variant="contained" onClick={() => handleOpenAuthForm(0)}>
                            Login
                        </Button>
                        <Button sx={{ display: { xs: "none", md: "block" } }} onClick={() => handleOpenAuthForm(1)} >
                            Sign up
                        </Button>
                    </Stack>
                </Stack>
            </Box>
            {/* hero section */}
            <Stack direction="row" flexWrap="wrap" justifyContent={"center"} gap="1.5rem" component={"section"} paddingBlock="2vh" alignItems={"center"}>
                {/* hero text */}
                <Stack flexBasis="500px" flexGrow={1} spacing="1rem">
                    <Typography variant="h2">Gain insights into market with AI</Typography>
                    <Typography variant="body1">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum totam sunt vel laudantium nobis velit, aut ducimus esse ea deleniti consequatur quibusdam consectetur modi atque quasi nemo tenetur quia aliquid.
                    </Typography>
                    <Button variant="contained"  onClick={() => handleOpenAuthForm(0)}>
                        Get started
                    </Button>
                </Stack>
                <Stack flexBasis="300px" flexGrow={1} alignItems={{ xs: "center", md: "end" }} paddingInline={"2rem"}>
                    <Box sx={{ width: "230px", height: "350px", borderWidth: "2px", borderStyle: "solid", borderRadius: "400px", boxShadow: `10px 4px 4px ${theme.palette.secondary.main}` }} borderColor={theme.palette.primary.main} position="relative" >

                        <Button variant="contained" sx={{ position: "absolute", bottom: "30%", left: "-30%", display: "flex", gap: "1rem", textAlign: "left" }}>
                            <AutoAwesomeRoundedIcon />
                            <span style={{ width: "100px", lineHeight: "15px" }}>
                                Today’s predictions
                            </span>
                        </Button>

                        <Button variant="contained" color="secondary" sx={{ position: "absolute", top: "30%", right: "-30%", display: "flex", gap: "1rem", textAlign: "left" }}>
                            <AutoAwesomeRoundedIcon />
                            <span style={{ width: "100px", lineHeight: "15px" }}>
                                Hot takes and trends
                            </span>
                        </Button>
                    </Box>

                </Stack>
            </Stack>

            <Stack paddingBlock="2vh" gap={3} component={"section"}>
                <Typography variant="h2" textAlign="center">Features</Typography>
                <Stack direction="row" justifyContent="center" gap={3} flexWrap="wrap">

                    <Card sx={{ backgroundColor: "secondary.main" }}>
                        <CardContent sx={{ display: "contents" }}>
                            <Box component={"img"} src={heartIcon} bgcolor={"background.default"} borderRadius="50%" padding="9px" width="48px" height="48px" />

                            <Typography gutterBottom variant="subtitle1" component="div">
                                Analyse
                            </Typography>
                            <Typography variant="body1">
                                KPIs, GDPs, and other economic indicators
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent sx={{ display: "contents" }}>
                            <Box component={"img"} src={heartIcon} bgcolor={"background.default"} borderRadius="50%" padding="9px" width="48px" height="48px" />

                            <Typography gutterBottom variant="subtitle1" component="div">
                                Advise
                            </Typography>
                            <Typography variant="body1">
                                KPIs, GDPs, and other economic indicators
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card sx={{ backgroundColor: "secondary.main" }}>
                        <CardContent sx={{ display: "contents" }}>
                            <Box component={"img"} src={heartIcon} bgcolor={"background.default"} borderRadius="50%" padding="9px" width="48px" height="48px" />

                            <Typography gutterBottom variant="subtitle1" component="div">
                                Summarise
                            </Typography>
                            <Typography variant="body1">
                                KPIs, GDPs, and other economic indicators
                            </Typography>
                        </CardContent>
                    </Card>
                </Stack>
            </Stack>

            <Stack marginTop="5vh" gap={3} component={"section"} bgcolor={"primary.main"} borderRadius={"30px"}
                sx={{ paddingBlock: "2rem", paddingInline: "max(5vw, 1rem)" }} direction="row" flexWrap={"wrap"}
                justifyContent={"center"} alignItems={"center"}
            >
                <Stack gap={1} flexBasis={"450px"} flexGrow={1}>
                    <Typography variant="h3" color="primary.contrastText">
                        Unlock the Power of Predictive Insights
                    </Typography>
                    <Typography variant="subtitle1" color="primary.contrastText">
                        Integrated with Gemini LLM for:
                    </Typography>

                    <Stack gap={1}>
                        <Stack direction="row" gap={1} alignItems="center">
                            <Box component={"img"} src={appsIcon} width="24px" height="24px" alt=" " />
                            <Typography variant="body1" color="secondary">
                                Investors seeking market foresight
                            </Typography>
                        </Stack>

                        <Stack direction="row" gap={1} alignItems="center" >
                            <Box component={"img"} src={appsIcon} width="24px" height="24px" alt=" " />
                            <Typography variant="body1" color="secondary">
                                Businesses aiming to predict demand and supply dynamics
                            </Typography>
                        </Stack>

                        <Stack direction="row" gap={1} alignItems="center" >
                            <Box component={"img"} src={appsIcon} width="24px" height="24px" alt=" " />
                            <Typography variant="body1" color="secondary">
                                Analysts uncovering hidden patterns in data
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Box component={"img"} src={graph} width={"250px"} display={{ xs: "none", md: "block" }} loading="lazy" alt="graph" />
            </Stack>

            <AuthenticationForms open={openAuthForm} onClose={handleCloseAuthForm} value={formToOpen} />
        </>
    )
}
