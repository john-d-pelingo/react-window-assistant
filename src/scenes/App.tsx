import React, { FC } from 'react'
import { Router } from '@reach/router'

import { home, jsonSorter, urlInterpreter } from '../consants/routes'
import { Home } from './Home'
import { JSONSorter } from './JSONSorter'
import { URLInterpreter } from './URLInterpreter'

export const App: FC = () => (
  <div>
    <Router>
      <Home path={home} />
      <JSONSorter path={jsonSorter} />
      <URLInterpreter path={urlInterpreter} />
    </Router>
  </div>
)
