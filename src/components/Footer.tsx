import { Link, Typography } from '@material-ui/core'
import { FC } from 'react'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  color: white;
  padding: 16px;
  margin-top: auto;
  background-color: #212121;
`

export const Footer: FC = () => (
  <StyledFooter>
    <Typography align="center" variant="body2">
      Built with{' '}
      <Link
        component="a"
        href="https://github.com/john-d-pelingo/react-window-assistant"
        rel="noreferrer noopener"
        target="_blank"
      >
        React and TypeScript
      </Link>
      !
    </Typography>
  </StyledFooter>
)
