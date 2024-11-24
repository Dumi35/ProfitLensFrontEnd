import { createTheme, Theme } from "@mui/material"
// import '@fontsource/outfit';
import NexaLight from '../assets/fonts/NexaLight.ttf';

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

let theme: Theme = createTheme({
    palette: {
        primary: {
            main: green500, //dark green
            400: green400, //shades of green
            300: green300,
            200: green200,
            100: green100,
            contrastText: "#f3fcf2",
        },
        secondary: {
            main: yellow500, //yellow
            contrastText: green500, //dark green
        },
        grey: {
            100: grey100,
            200: grey200
        },
        background:{
            default: accentLight
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '@font-face': {
                    fontFamily: 'NexaLight',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    src: `url(${NexaLight}) format('truetype')`,
                }
            },
        },
    },
    typography: {
        fontFamily: 'NexaLight, Outfit',
        h1: {
            fontFamily: 'NexaLight',
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