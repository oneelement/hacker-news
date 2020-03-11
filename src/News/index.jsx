import React from 'react'

import {
  Container,
  CssBaseline,
} from '@material-ui/core'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FF6602',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#029BFF',
      contrastText: '#FFFFFF',
    }
  },
})

import Header from './components/Header'
import NewsList from './components/NewsList'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container fixed disableGutters maxWidth="md">
        <NewsList />
      </Container>
    </ThemeProvider>    
  )
}

export default App
