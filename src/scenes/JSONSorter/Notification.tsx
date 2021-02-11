import { IconButton, Snackbar, SnackbarContent } from '@material-ui/core'
import { SnackbarContentProps } from '@material-ui/core/SnackbarContent'
import { SvgIconProps } from '@material-ui/core/SvgIcon'
import { amber, blue, green, red } from '@material-ui/core/colors'
import { CheckCircle, Close, Error, Info, Warning } from '@material-ui/icons'
import { ComponentType, FC } from 'react'
import styled from 'styled-components'

type Category = 'error' | 'info' | 'success' | 'warning'

interface NotificationProps extends SnackbarContentProps {
  autoHideDuration?: number
  category?: Category
  className?: string
  isSnackBarOpen?: boolean
  onClose: () => void
}

type CategoryIcon = { [key in Category]: ComponentType<SvgIconProps> }

const categoryIcon: CategoryIcon = {
  error: Error,
  info: Info,
  success: CheckCircle,
  warning: Warning,
}

// eslint-disable-next-line
const StyledSnackbarContent = styled(({ category, ...otherProps }) => (
  <SnackbarContent {...otherProps} />
))<{
  category: Category
}>`
  && {
    background-color: ${(props) => {
      switch (props.category) {
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

export const Notification: FC<NotificationProps> = ({
  category = 'success',
  className = '',
  isSnackBarOpen = false,
  message,
  onClose,
  ...snackbarContentProps
}) => {
  const Icon = categoryIcon[category]

  const StyledIcon = styled(Icon)`
    font-size: 20px;
    margin-right: 8px;
    opacity: 0.9;
  `

  const StyledIconComponent = () => <StyledIcon />

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
        category={category}
        className={className}
        message={
          <Message id="client-snackbar">
            <StyledIconComponent />
            {message}
          </Message>
        }
        {...snackbarContentProps}
      />
    </Snackbar>
  )
}
