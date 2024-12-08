import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { Avatar, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogOutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from "@profitlens/assets/images/logo.png"
import HelpIcon from "@mui/icons-material/HelpOutlineOutlined"
import { Outlet, useLocation} from 'react-router-dom';
import { startRegistration, platformAuthenticatorIsAvailable } from '@simplewebauthn/browser';
// import useAuth from '../context/authContext';
// import { SERVER_URL } from '@profitlens/config';
import axios from 'axios';
import { useRef } from 'react';

const registerPasskey = async (email: string) => {
    // refer to https://simplewebauthn.dev/docs/packages/browser
   
    console.log('here', email, await platformAuthenticatorIsAvailable())
    console.log('here2', email, await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable())
    /**
     * Get options then call `startRegistration()`. Errors should be ignored
     * as auto upgrade is considered "opportunistic" and can fail more easily
     * than other such WebAuthn calls if the browser is not satisfied that all
     * requirements have been met.
     */

    let attResp;
    axios.post(`https://34b4-105-113-63-70.ngrok-free.app/api/webauth/generate-registration-options`, { email }).then(async (res) => {
        const optionsJSON = res.data
        console.log('generate reg options JSON', optionsJSON)
        try {
            // Pass the options to the authenticator and wait for a response
            attResp = await startRegistration({ optionsJSON });
            console.log('attResp',attResp)
            axios.post(`https://34b4-105-113-63-70.ngrok-free.app/api/webauth/verify-registration-options`, attResp ).then(async (res) => {
                const verificationJSON = res.data;
                console.log('verification reg options JSON', verificationJSON)
                // Show UI appropriate for the `verified` status
                if (verificationJSON && verificationJSON.verified) {
                    alert('Success')
                } else {
                    console.log(`Oh no, something went wrong! Response: ${JSON.stringify(
                        verificationJSON)
                    })`)
                  
                }
        
            })

        } catch (error: any) {
            // Some basic error handling
            if (error.name === 'InvalidStateError') {
                console.warn('Error: Authenticator was probably already registered by user')
            } else {
                console.warn('other', error)
            }

            throw error;
        }

    })

    

    // POST the response to the endpoint that calls
    // @simplewebauthn/server -> verifyRegistrationResponse()   

}

export const DRAWERWIDTH = 240;

export default function UserDrawer() {
    //   const { user } = useAuth();
    const user = { email: 'Guest' }
    const USERNAME: string = user?.email?.split(".")[0]?.charAt(0).toUpperCase()! + user?.email?.split(".")[0]?.slice(1)
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    // const navigate = useNavigate();

    //   const { logout } = useAuth();
    const location = useLocation()
    const email = useRef(location.state.email)
    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    //drawer component
    const drawerIcons = [<HelpIcon />]


    const drawer = (
        <div>
            <Toolbar>
                <img src={logo} width={"150px"} />
            </Toolbar>

            <List sx={{ paddingInline: "14px", paddingBlock: 0, marginBottom: "5px" }}>
                {['Help', 'Create passkey'].map((text, index) => {

                    if (text != 'Help') {
                        // creating passkeys

                        return (
                            <ListItem key={text} disablePadding>
                                <ListItemButton onClick={() => registerPasskey(email.current)} sx={{
                                    bgcolor: 'background.default',
                                    '&:hover': {
                                        bgcolor: 'background.default',
                                    },
                                }}>
                                    <ListItemIcon>
                                        {drawerIcons[index]}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>

                            </ListItem>
                        )
                    } else {
                        return (
                            <ListItem key={text} disablePadding>

                                <ListItemButton onClick={() => { }} sx={{
                                    bgcolor: 'background.default',
                                    '&:hover': {
                                        bgcolor: 'background.default',
                                    },
                                }}>
                                    <ListItemIcon>
                                        {drawerIcons[index]}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>

                            </ListItem>
                        )
                    }
                })}
            </List>
            <Divider />
            <List sx={{ paddingInline: "14px" }}>
                {['Log out'].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => {/*logout*/ }} sx={{
                            borderRadius: "30px",
                            bgcolor: 'background.default'
                        }}>
                            <ListItemIcon>
                                <LogOutIcon />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { md: `calc(100% - ${DRAWERWIDTH}px)` },
                    ml: { md: `${DRAWERWIDTH}px` },
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <Toolbar sx={{ display: "flex", }}>
                    <Stack direction={"row"} spacing={1} alignItems={'center'}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { md: 'none', backgroundColor: 'transparent' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography sx={{ display: { md: 'none' } }}>ProfitLens</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center" marginLeft={"auto"}>

                        <Avatar
                            alt={USERNAME ?? "Guest"}
                            src="/broken-image.jpg"
                            sx={{ width: 35, height: 35, fontSize: "1rem" }}
                        />
                        <Typography variant="subtitle1" noWrap component="div" sx={{ display: { xs: "none", sm: "block" } }}>
                            {USERNAME ?? "Guest"}
                        </Typography>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { md: DRAWERWIDTH }, flexShrink: { md: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWERWIDTH },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWERWIDTH },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Outlet />
        </Box>
    );
}
