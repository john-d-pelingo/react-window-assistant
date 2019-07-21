import { AppBar, Link as MaterialLink, Toolbar } from '@material-ui/core'
import { grey, red } from '@material-ui/core/colors'
import { Link, LinkGetProps } from '@reach/router'
import React, { FC } from 'react'
import styled from 'styled-components'

import {
  colorClarifier,
  home,
  jsonSorter,
  keyCodeRevealer,
  textConverter,
  urlInterpreter,
} from 'consants/routes'
import { appName } from 'consants/strings'

const StyledToolbar = styled(Toolbar)`
  color: white;
  flex-wrap: wrap;
  justify-content: space-between;
`

const StyledLink = styled(Link)`
  && {
    margin: 8px 12px;
  }
`

const appRoutes: Array<{
  name: string
  path: string
}> = [
  { name: 'Home', path: home },
  { name: 'JSON Sorter', path: jsonSorter },
  { name: 'URL Interpreter', path: urlInterpreter },
  { name: 'Color Clarifier', path: colorClarifier },
  { name: 'Text Converter', path: textConverter },
  { name: 'Key Code Revealer', path: keyCodeRevealer },
]

const getActiveStyles = ({ isCurrent, href, location }: LinkGetProps) => {
  const isCompletelyCurrent = href === location.pathname || isCurrent
  return {
    style: {
      color: isCompletelyCurrent ? red['900'] : 'inherit',
      fontWeight: isCompletelyCurrent ? 'bold' : 'current',
    },
  }
}

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
          component={Link}
          noWrap
          to={home}
          variant="h6"
        >
          {appName}
        </MaterialLink>
        <nav>
          {appRoutes.map(appRoute => (
            <MaterialLink
              key={appRoute.path}
              color="textPrimary"
              component={StyledLink}
              getProps={getActiveStyles}
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
