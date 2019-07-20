import { IconButton, Snackbar, SnackbarContent } from '@material-ui/core'
import { amber, blue, green, red } from '@material-ui/core/colors'
import { SnackbarContentProps } from '@material-ui/core/SnackbarContent'
import { SvgIconProps } from '@material-ui/core/SvgIcon'
import { CheckCircle, Close, Error, Info, Warning } from '@material-ui/icons'
import React, { ComponentType, FC } from 'react'
import styled from 'styled-components'

type Variant = 'error' | 'info' | 'success' | 'warning'

interface IErrorNotificationProps extends SnackbarContentProps {
  autoHideDuration?: number
  className?: string
  isSnackBarOpen?: boolean
  onClose: () => void
  variant?: Variant
}

type VariantIcon = { [key in Variant]: ComponentType<SvgIconProps> }

const variantIcon: VariantIcon = {
  error: Error,
  info: Info,
  success: CheckCircle,
  warning: Warning,
}

// eslint-disable-next-line
const StyledSnackbarContent = styled(({ colorVariant, ...otherProps }) => (
  <SnackbarContent {...otherProps} />
))<{
  colorVariant: Variant
}>`
  && {
    background-color: ${props => {
      switch (props.colorVariant) {
        case 'success':
          return green[600]
        case 'error':
          return red[600]
        case 'warning':
          return amber[700]
        case 'info':
        default:
          return blue[600]
      }
    }};
  }
`

const StyledClose = styled(Close)`
  font-size: 20px;
`

const Message = styled.span`
  display: flex;
  align-items: center;
`

export const ErrorNotification: FC<IErrorNotificationProps> = ({
  autoHideDuration = 6000,
  className = '',
  isSnackBarOpen = false,
  message,
  onClose,
  variant = 'success',
  ...snackbarContentProps
}) => {
  const Icon = variantIcon[variant]

  const StyledIcon = styled(Icon)`
    font-size: 20px;
    margin-right: 8px;
    opacity: 0.9;
  `

  return (
    <Snackbar
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      autoHideDuration={6000}
      onClose={() => 1}
      open={isSnackBarOpen}
    >
      <StyledSnackbarContent
        action={[
          <IconButton
            aria-label="Close error notification"
            color="inherit"
            key="close"
            onClick={onClose}
          >
            <StyledClose />
          </IconButton>,
        ]}
        aria-describedby="client-snackbar"
        className={className}
        message={
          <Message id="client-snackbar">
            <StyledIcon />
            {message}
          </Message>
        }
        colorVariant={variant}
        {...snackbarContentProps}
      />
    </Snackbar>
  )
}
