import React, { ComponentType, FC } from 'react'
import clsx from 'clsx'
import { IconButton, Snackbar, SnackbarContent } from '@material-ui/core'
import { CheckCircle, Close, Error, Info, Warning } from '@material-ui/icons'
import { SnackbarContentProps } from '@material-ui/core/SnackbarContent'
import { SvgIconProps } from '@material-ui/core/SvgIcon'

import { useErrorNotificationStyles } from './useErrorNotificationStyles'

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
  success: CheckCircle,
  warning: Warning,
  error: Error,
  info: Info,
}

export const ErrorNotification: FC<IErrorNotificationProps> = ({
  autoHideDuration = 6000,
  className = '',
  isSnackBarOpen = false,
  message,
  onClose,
  variant = 'success',
  ...snackbarContentProps
}) => {
  const classes = useErrorNotificationStyles()
  const Icon = variantIcon[variant]

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      autoHideDuration={6000}
      onClose={() => 1}
      open={isSnackBarOpen}
    >
      <SnackbarContent
        action={[
          <IconButton
            aria-label="Close error notification"
            color="inherit"
            key="close"
            onClick={onClose}
          >
            <Close className={classes.icon} />
          </IconButton>,
        ]}
        aria-describedby="client-snackbar"
        className={clsx(classes[variant], className)}
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        {...snackbarContentProps}
      />
    </Snackbar>
  )
}