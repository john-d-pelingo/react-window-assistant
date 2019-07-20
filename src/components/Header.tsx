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
  urlInterpreter,
} from 'consants/routes'
import { appName } from 'consants/strings'

const getActiveStyles = ({ isCurrent, href, location }: LinkGetProps) => {
  const isCompletelyCurrent = href === location.pathname || isCurrent
  return {
    style: {
      color: isCompletelyCurrent ? red['900'] : 'inherit',
      fontWeight: isCompletelyCurrent ? 'bold' : 'current',
    },
  }
}

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
          <MaterialLink
            color="textPrimary"
            component={StyledLink}
            getProps={getActiveStyles}
            to={home}
          >
            Home
          </MaterialLink>
          <MaterialLink
            color="textPrimary"
            component={StyledLink}
            getProps={getActiveStyles}
            to={jsonSorter}
          >
            JSON Sorter
          </MaterialLink>
          <MaterialLink
            color="textPrimary"
            component={StyledLink}
            getProps={getActiveStyles}
            to={urlInterpreter}
          >
            URL Interpreter
          </MaterialLink>
          <MaterialLink
            color="textPrimary"
            component={StyledLink}
            getProps={getActiveStyles}
            to={colorClarifier}
          >
            Color Clarifier
          </MaterialLink>
          <MaterialLink
            color="textPrimary"
            component={StyledLink}
            getProps={getActiveStyles}
            to={keyCodeRevealer}
          >
            Key Code Revealer
          </MaterialLink>
        </nav>
      </StyledToolbar>
    </AppBar>
  )
}
