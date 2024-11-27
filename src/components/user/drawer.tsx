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
import { Outlet, useNavigate } from 'react-router-dom';
// import useAuth from '../context/authContext';


export const DRAWERWIDTH = 240;

export default function UserDrawer() {
    //   const { user } = useAuth();
    const user = { email: 'Guest' }
    const USERNAME: string = user?.email?.split(".")[0]?.charAt(0).toUpperCase()! + user?.email?.split(".")[0]?.slice(1)
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const navigate = useNavigate();

    //   const { logout } = useAuth();

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
                {['Help'].map((text, index) => {
                    const to = `${text.toLowerCase().split(" ").join("-")}`
                    if (text != 'Help') {
                        return (
                            <ListItem key={text} disablePadding>
                                <ListItemButton onClick={() => navigate(to)} sx={{
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
                            bgcolor:'background.default'
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
                        <Typography sx={{ display: { md: 'none'}}}>ProfitLens</Typography>
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
