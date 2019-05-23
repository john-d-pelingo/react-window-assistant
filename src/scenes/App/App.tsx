import { LocationProvider, Router } from '@reach/router'
import { Container, CssBaseline } from '@material-ui/core'
import React, { FC, lazy, Suspense } from 'react'

import { ErrorBoundary } from 'components/ErrorBoundary'
import { Footer } from 'components/Footer'
import { Header } from 'components/Header'
import { home, jsonSorter, urlInterpreter } from 'consants/routes'
import { history } from 'helpers/reachRouterUtils'

import { useAppStyles } from './useAppStyles'

const Home = lazy(() => import(/* webpackChunkName: "Home" */ '../Home'))
const JSONSorter = lazy(() =>
  import(/* webpackChunkName: "JSONSorter" */ '../JSONSorter'),
)
const URLInterpreter = lazy(() =>
  import(/* webpackChunkName: "URLInterpreter" */ '../URLInterpreter'),
)

export const App: FC = () => {
  const classes = useAppStyles()

  return (
    <LocationProvider history={history}>
      <div className={classes.app}>
        <ErrorBoundary>
          <CssBaseline />
          <Header />
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
          <Footer />
        </ErrorBoundary>
      </div>
    </LocationProvider>
  )
}
