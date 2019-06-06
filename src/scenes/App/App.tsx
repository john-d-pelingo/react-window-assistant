import { LocationProvider, Router } from '@reach/router'
import { Container, CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import React, { FC, lazy, Suspense } from 'react'

import { ErrorBoundary } from 'components/ErrorBoundary'
import { Footer } from 'components/Footer'
import { Header } from 'components/Header'
import { Loading } from 'components/Loading'
import {
  colorClarifier,
  home,
  jsonSorter,
  urlInterpreter,
} from 'consants/routes'
import { appTheme } from 'helpers/appTheme'
import { hashHistory } from 'helpers/reachRouterUtils'

import { useAppStyles } from './useAppStyles'

const Home = lazy(() => import(/* webpackChunkName: "Home" */ '../Home'))
const JSONSorter = lazy(() =>
  import(/* webpackChunkName: "JSONSorter" */ '../JSONSorter'),
)
const URLInterpreter = lazy(() =>
  import(/* webpackChunkName: "URLInterpreter" */ '../URLInterpreter'),
)
const ColorClarifier = lazy(() =>
  import(/* webpackChunkName: "ColorClarifier" */ '../ColorClarifier'),
)

export const App: FC = () => {
  const classes = useAppStyles()

  return (
    <ErrorBoundary>
      <LocationProvider history={hashHistory}>
        <ThemeProvider theme={appTheme}>
          <div className={classes.app}>
            <CssBaseline />
            <Header />
            <main>
              <Container maxWidth="xl" component="main">
                <Suspense fallback={<Loading />}>
                  <Router>
                    <Home path={home} />
                    <JSONSorter path={jsonSorter} />
                    <URLInterpreter path={urlInterpreter} />
                    <ColorClarifier path={colorClarifier} />
                  </Router>
                </Suspense>
              </Container>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </LocationProvider>
    </ErrorBoundary>
  )
}
