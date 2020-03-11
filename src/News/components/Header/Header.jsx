import React from 'react'

import {
  AppBar,
  Typography,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  appBar: {
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`
  },
  logoContainer: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(1)
  },
  logoImg: {
    height: '31px',
    verticalAlign: 'middle',
    border: '2px solid white',
    marginRight: theme.spacing(1),
  },
}))

const Header = ({ theme }) => {
  const classes = useStyles(theme)

  return (
    <AppBar position="static">
      <Typography className={classes.logoContainer} variant="h6">
        <img className={classes.logoImg} src="y18.gif" alt="Hacker News 2.0" /> Hacker News 2.0
      </Typography>
    </AppBar>
  )
}

export default Header