import React, { FC, MouseEvent, useState } from 'react'
import { Box, Button, Popover, Typography } from '@material-ui/core'

import { copyToClipboard } from 'helpers/copyToClipboard'

import { useButtonActionStyles } from './useButtonActionStyles'

interface IButtonActionsProps {
  canCopyJson: boolean
  canSort: boolean
  textToCopy?: string
}

export const ButtonActions: FC<IButtonActionsProps> = ({
  canCopyJson,
  canSort,
  textToCopy = '',
}) => {
  const classes = useButtonActionStyles()
  const [popOverAnchorEl, setPopOverAnchorEl] = useState<
    EventTarget & HTMLButtonElement | null
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
    <Box className={classes.buttonActionBox}>
      <Button
        aria-label="Copy button"
        aria-describedby={id}
        className={classes.copyButton}
        color="secondary"
        disabled={!canCopyJson}
        onClick={handleCopyClick}
        variant="contained"
      >
        Copy
      </Button>
      <Popover
        anchorEl={popOverAnchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        id={id}
        open={isPopOverOpen}
        onClose={handlePopOverClose}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
      >
        <Typography className={classes.typography}>Copied JSON!</Typography>
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
    </Box>
  )
}
