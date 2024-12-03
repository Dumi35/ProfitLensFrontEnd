import { createTheme, Theme } from "@mui/material"
import '@fontsource/outfit/400.css';
import NexaLight from '../assets/fonts/NexaLight.ttf';
import NexaBold from '../assets/fonts/NexaBold.ttf';

const green500 = "#00370d"
const green400 = "#2c5d30"
const green300 = "#548656"
const green200 = "#7db17e"
const green100 = "#a9dea9"

const yellow500 = "#f6df5b"

const grey100 = "#e7e7e7"
const grey200 = "#b8bcc2"

const accentLight = '#f3fcf2'
const accentDark = "#111113"

const lemon = '#c7f35e'

// border radii
const radiusSm = "30px"
// const radiusMd = "70px"
// const radiusLg = "400px"

let theme: Theme = createTheme({
    palette: {
        primary: {
            main: green500, //dark green
            400: green400, //shades of green
            300: green300,
            200: green200,
            100: green100,
            contrastText: accentLight,
        },
        secondary: {
            main: yellow500, //yellow
            contrastText: green500, //dark green
        },
        grey: {
            100: grey100,
            200: grey200
        },
        background: {
            default: accentLight,
            paper: accentLight
        }
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: accentLight,
                    color: accentDark,
                    boxShadow: "none",
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
                },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none !important',
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: `
                @font-face {
                font-family: 'NexaLight';
                font-style: normal;
                font-weight: 400;
                src: url(${NexaLight}) format('truetype');
                }
                @font-face {
                font-family: 'NexaBold';
                font-style: normal;
                src: url(${NexaBold}) format('truetype');
                }
      `,
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "capitalize",
                    borderRadius: radiusSm,
                    width: "fit-content",
                    minWidth: "130px",
                    paddingInline: "15px",
                    fontFamily: "NexaBold",
                },
                containedPrimary: {
                    backgroundColor: yellow500,
                    color: green500
                },
                containedSecondary: {
                    backgroundColor: green500,
                    color: accentLight
                },
            },
        },
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    backgroundColor: yellow500,
                }
            }
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: green500
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    border: `2px solid ${accentDark}`,
                    borderRadius: radiusSm,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 15,
                    maxWidth: 200,
                    height: 230,
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    paddingBlock: 1
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: radiusSm,
                    border: `2px solid ${accentDark}`
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: radiusSm,
                    backgroundColor: accentLight
                }
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    fontFamily: 'Outfit'
                }
            }
        }
    },
    typography: {
        fontFamily: 'NexaBold, NexaLight, Outfit',
        h2: {
            fontFamily: 'NexaBold',
            color: green500
        },
        h3: {
            fontFamily: 'NexaBold',
            fontSize: "clamp(30px, 1.5rem + 2vw, 50px)"
        },
        h4: {
            fontFamily: 'NexaBold',
            color: green500
        },
        subtitle1: {
            fontFamily: 'NexaBold',
            color: green500
        },
        body1: {
            fontFamily: 'Outfit',
            color: accentDark
        }
    }
})

theme = createTheme(theme, {
    // Custom colors created with augmentColor go here
    palette: {
        accentLight: theme.palette.augmentColor({
            color: {
                main: accentLight, //like white
            },
            name: 'accentLight',
        }),
        accentDark: theme.palette.augmentColor({
            color: {
                main: accentDark, //like black
            },
            name: 'accentDark',
        }),
        lemon: theme.palette.augmentColor({
            color: {
                main: lemon, //greenish-yellow
            },
            name: 'lemon',
        }),
    }

});

export { theme }