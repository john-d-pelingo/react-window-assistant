import { Link, LinkGetProps, Router } from '@reach/router'
import {
  AppBar,
  Container,
  CssBaseline,
  Link as MaterialLink,
  Toolbar,
  Typography,
} from '@material-ui/core'
import React, { FC, lazy, Suspense } from 'react'

import { ErrorBoundary } from 'components/ErrorBoundary'
import { home, jsonSorter, urlInterpreter } from 'consants/routes'
import { appName } from 'consants/strings'
import { useStyles } from 'hooks/styles/app'

const getActiveStyles = ({ isCurrent }: LinkGetProps) => ({
  style: {
    color: isCurrent ? 'red' : 'inherit',
  },
})

const Home = lazy(() => import(/* webpackChunkName: "Home" */ '../Home'))
const JSONSorter = lazy(() =>
  import(/* webpackChunkName: "JSONSorter" */ '../JSONSorter'),
)
const URLInterpreter = lazy(() =>
  import(/* webpackChunkName: "URLInterpreter" */ '../URLInterpreter'),
)

export const App: FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.app}>
      <ErrorBoundary>
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
              getProps={getActiveStyles}
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
                getProps={getActiveStyles}
                to={home}
                variant="button"
              >
                Home
              </MaterialLink>
              <MaterialLink
                className={classes.link}
                color="textPrimary"
                component={Link}
                getProps={getActiveStyles}
                to={jsonSorter}
                variant="button"
              >
                JSON Sorter
              </MaterialLink>
              <MaterialLink
                className={classes.link}
                color="textPrimary"
                component={Link}
                getProps={getActiveStyles}
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
            <Suspense fallback={<div>Loading ...</div>}>
              <Router>
                <Home path={home} />
                <JSONSorter path={jsonSorter} />
                <URLInterpreter path={urlInterpreter} />
              </Router>
            </Suspense>
          </Container>
        </main>
        <footer className={classes.footer}>
          <Typography align="center" color="textSecondary" variant="body2">
            Built with love ❤
          </Typography>
        </footer>
      </ErrorBoundary>
    </div>
  )
}
