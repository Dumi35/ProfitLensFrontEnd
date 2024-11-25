import './App.css'
import { ThemeProvider, CssBaseline } from '@mui/material'
import {theme} from './context/theme.ts'
import HomePage from './pages/Home.tsx'

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
       <HomePage/>
    </ThemeProvider>
  )
}

export default App
