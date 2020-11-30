import { ClickAwayListener, IconButton, Tooltip } from '@material-ui/core'
import { FileCopyRounded } from '@material-ui/icons'
import { copyToClipboard } from 'helpers/copyToClipboard'
import { FC, useState } from 'react'

interface CopyColorButtonProps {
  color: { colorString: string; name: string }
}

export const CopyColorButton: FC<CopyColorButtonProps> = ({ color }) => {
  const [isToolTipOpen, setIsToolTipOpen] = useState(false)

  const handleTooltipClose = () => {
    setIsToolTipOpen(false)
  }

  const handleButtonClick = () => {
    setIsToolTipOpen(true)
    copyToClipboard(color.colorString)
  }

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div>
        <Tooltip
          aria-label="foo-bar"
          disableFocusListener
          disableHoverListener
          disableTouchListener
          onClose={handleTooltipClose}
          open={isToolTipOpen}
          placement="left"
          PopperProps={{
            disablePortal: true,
          }}
          title="Copied!"
        >
          <IconButton
            aria-label={`Copy ${color.name} color`}
            onClick={handleButtonClick}
          >
            <FileCopyRounded />
          </IconButton>
        </Tooltip>
      </div>
    </ClickAwayListener>
  )
}
