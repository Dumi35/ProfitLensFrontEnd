import './App.css'
import { Typography,ThemeProvider, CssBaseline } from '@mui/material'
import {theme} from './context/theme.ts'

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Typography variant='h1'>Hi boss good Login</Typography>
        <Typography variant='body1'>Hi boss good Login</Typography>
    </ThemeProvider>
  )
}

export default App
