import { AppBar, Link as MaterialLink, Toolbar } from '@material-ui/core'
import { grey, red } from '@material-ui/core/colors'
import {
  colorClarifier,
  home,
  jsonSorter,
  keyCodeRevealer,
  Routes,
  textConverter,
  urlInterpreter,
} from 'consants/routes'
import { appName } from 'consants/strings'
import { FC } from 'react'
import { match as matchType, NavLink } from 'react-router-dom'
import styled from 'styled-components'

const StyledToolbar = styled(Toolbar)`
  color: white;
  flex-wrap: wrap;
  justify-content: space-between;
`

const StyledLink = styled(NavLink)`
  && {
    color: white;
    margin: 8px 12px;
  }
`

const appRoutes: Array<{
  name: string
  path: Routes
}> = [
  { name: 'Home', path: home },
  { name: 'JSON Sorter', path: jsonSorter },
  { name: 'URL Interpreter', path: urlInterpreter },
  { name: 'Color Clarifier', path: colorClarifier },
  { name: 'Text Converter', path: textConverter },
  { name: 'Key Code Revealer', path: keyCodeRevealer },
]

const isActive = (match: matchType | null): boolean =>
  match ? match.isExact : false

export const Header: FC = () => {
  // TODO: transform to burger menu or something
  return (
    <AppBar
      color="default"
      elevation={0}
      position="static"
      style={{
        backgroundColor: grey['900'],
      }}
    >
      <StyledToolbar>
        <MaterialLink
          color="inherit"
          component={NavLink}
          noWrap
          to={home}
          variant="h6"
        >
          {appName}
        </MaterialLink>
        <nav>
          {appRoutes.map((appRoute) => (
            <MaterialLink
              activeStyle={{
                color: red['900'],
                fontWeight: 'bold',
              }}
              key={appRoute.path}
              color="textPrimary"
              component={StyledLink}
              isActive={isActive}
              to={appRoute.path}
            >
              {appRoute.name}
            </MaterialLink>
          ))}
        </nav>
      </StyledToolbar>
    </AppBar>
  )
}
