import { Box, Button, Popover, Typography } from '@material-ui/core'
import React, { FC, MouseEvent, useState } from 'react'
import styled from 'styled-components'

import { copyToClipboard } from 'helpers/copyToClipboard'

const StyledBox = styled(Box)`
  display: flex;
  margin-top: 24px;
  justify-content: flex-end;
`

const CopyButton = styled(Button)`
  && {
    margin-right: 24px;
  }
`

const StyledTypograhpy = styled(Typography)`
  padding: 16px;
`

interface ButtonActionsProps {
  canCopyJson: boolean
  canSort: boolean
  textToCopy?: string
}

export const ButtonActions: FC<ButtonActionsProps> = ({
  canCopyJson,
  canSort,
  textToCopy = '',
}) => {
  const [popOverAnchorEl, setPopOverAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | null
  >()

  const handleCopyClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()

    setPopOverAnchorEl(event.currentTarget)

    copyToClipboard(textToCopy)
  }

  const handlePopOverClose = (): void => {
    setPopOverAnchorEl(null)
  }

  const isPopOverOpen = Boolean(popOverAnchorEl)
  const id = isPopOverOpen ? 'simple-popover' : ''

  return (
    <StyledBox>
      <CopyButton
        aria-label="Copy button"
        aria-describedby={id}
        color="secondary"
        disabled={!canCopyJson}
        onClick={handleCopyClick}
        variant="contained"
      >
        Copy
      </CopyButton>
      <Popover
        anchorEl={popOverAnchorEl}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'center',
        }}
        id={id}
        open={isPopOverOpen}
        onClose={handlePopOverClose}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'center',
        }}
      >
        <StyledTypograhpy>Copied JSON!</StyledTypograhpy>
      </Popover>
      <Button
        aria-label="Sort button"
        color="primary"
        disabled={!canSort}
        type="submit"
        variant="contained"
      >
        Sort
      </Button>
    </StyledBox>
  )
}
