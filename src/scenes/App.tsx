import { Link, LinkGetProps, Router } from '@reach/router'
import {
  AppBar,
  Container,
  CssBaseline,
  Link as MaterialLink,
  Toolbar,
  Typography,
} from '@material-ui/core'
import React, { FC } from 'react'

import { home, jsonSorter, urlInterpreter } from '../consants/routes'
import { appName } from '../consants/strings'
import { useStyles } from '../hooks/styles/app'
import { Home } from './Home'
import { JSONSorter } from './JSONSorter'
import { URLInterpreter } from './URLInterpreter'

const getProps = ({ isCurrent }: LinkGetProps) => ({
  style: {
    color: isCurrent ? 'red' : 'inherit',
  },
})

export const App: FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.app}>
      <CssBaseline />
      <AppBar
        className={classes.appBar}
        color="default"
        elevation={0}
        position="static"
      >
        <Toolbar className={classes.toolbar}>
          <MaterialLink
            className={classes.toolbarTitle}
            color="inherit"
            component={Link}
            getProps={getProps}
            noWrap
            to={home}
            variant="h6"
          >
            {appName}
          </MaterialLink>
          <nav>
            <MaterialLink
              className={classes.link}
              color="textPrimary"
              component={Link}
              getProps={getProps}
              to={home}
              variant="button"
            >
              Home
            </MaterialLink>
            <MaterialLink
              className={classes.link}
              color="textPrimary"
              component={Link}
              getProps={getProps}
              to={jsonSorter}
              variant="button"
            >
              JSON Sorter
            </MaterialLink>
            <MaterialLink
              className={classes.link}
              color="textPrimary"
              component={Link}
              getProps={getProps}
              to={urlInterpreter}
              variant="button"
            >
              URL Interpreter
            </MaterialLink>
          </nav>
        </Toolbar>
      </AppBar>
      <main>
        <Container maxWidth="md" component="main">
          <Router>
            <Home path={home} />
            <JSONSorter path={jsonSorter} />
            <URLInterpreter path={urlInterpreter} />
          </Router>
        </Container>
      </main>
      <footer className={classes.footer}>
        <Typography align="center" color="textSecondary" variant="body2">
          Built with love ❤
        </Typography>
      </footer>
    </div>
  )
}
