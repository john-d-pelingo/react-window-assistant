import { Box, CircularProgress } from '@material-ui/core'
import { FC } from 'react'
import styled from 'styled-components'

const StyledBox = styled(Box)`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Loading: FC = () => (
  <StyledBox>
    <CircularProgress color="primary" style={{ margin: 16 }} />
  </StyledBox>
)
