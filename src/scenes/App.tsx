import { Container, CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { LocationProvider, Router } from '@reach/router'
import React, { FC, lazy, Suspense } from 'react'
import styled from 'styled-components'

import { ErrorBoundary } from 'components/ErrorBoundary'
import { Footer } from 'components/Footer'
import { Header } from 'components/Header'
import { Loading } from 'components/Loading'
import {
  colorClarifier,
  home,
  jsonSorter,
  keyCodeRevealer,
  textConverter,
  urlInterpreter,
} from 'consants/routes'
import { appTheme } from 'helpers/appTheme'
import { customHistory } from 'helpers/reachRouterUtils'

const Home = lazy(() => import(/* webpackChunkName: "Home" */ './Home'))
const JSONSorter = lazy(() =>
  import(/* webpackChunkName: "JSONSorter" */ './JSONSorter'),
)
const URLInterpreter = lazy(() =>
  import(/* webpackChunkName: "URLInterpreter" */ './URLInterpreter'),
)
const ColorClarifier = lazy(() =>
  import(/* webpackChunkName: "ColorClarifier" */ './ColorClarifier'),
)
const TextConverter = lazy(() =>
  import(/* webpackChunkName: "TextConverter" */ './TextConverter'),
)
const KeyCodeRevealer = lazy(() =>
  import(/* webpackChunkName: "KeyCodeRevealer" */ './KeyCodeRevealer'),
)

const AppContainer = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

export const App: FC = () => {
  return (
    <ErrorBoundary>
      <LocationProvider history={customHistory}>
        <ThemeProvider theme={appTheme}>
          <AppContainer>
            <CssBaseline />
            <Header />
            <Container maxWidth="xl" component="main">
              <Suspense fallback={<Loading />}>
                <Router>
                  <Home path={home} />
                  <JSONSorter path={jsonSorter} />
                  <URLInterpreter path={urlInterpreter} />
                  <ColorClarifier path={colorClarifier} />
                  <TextConverter path={textConverter} />
                  <KeyCodeRevealer path={keyCodeRevealer} />
                </Router>
              </Suspense>
            </Container>
            <Footer />
          </AppContainer>
        </ThemeProvider>
      </LocationProvider>
    </ErrorBoundary>
  )
}
