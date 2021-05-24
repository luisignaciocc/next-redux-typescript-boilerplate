import React, { useState, useEffect } from 'react'
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  SvgIcon,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import WhatshotIcon from '@material-ui/icons/Whatshot'

const useStyles = makeStyles((theme) => ({
  icon: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
}))

export type NotificationItemFn = (id?: number) => void

interface NotificationItemProps {
  alert: AlertModel
  action?: NotificationItemFn
}

const NotificationItem = ({ alert, action }: NotificationItemProps) => {
  const classes = useStyles()

  const [displayTimer, setDisplayTimer] = useState('')

  /**
   * update timer fn
   */
  const updateTimer = () => {
    let newDisplayTimer = ''

    let diffInminutes = dayjs().diff(dayjs(alert.updated_at), 'minutes')
    if (diffInminutes < 1) {
      newDisplayTimer = 'Ahora'
    } else if (diffInminutes > 0 && diffInminutes < 60) {
      newDisplayTimer = `${diffInminutes}  min(s)`
    } else if (diffInminutes >= 60 && diffInminutes < 1440) {
      newDisplayTimer = `${Math.round(diffInminutes / 60)} hr(s)`
    } else {
      newDisplayTimer = `${Math.round(diffInminutes / 60 / 24)} día(s)`
    }

    setDisplayTimer(newDisplayTimer)
  }

  /**
   * prepare timer
   */
  useEffect(() => {
    let timerInterval: any = null
    if (alert) {
      updateTimer()
      timerInterval = setInterval(updateTimer, 10000)
    }

    // timerInterval()
    return () => {
      clearInterval(timerInterval)
      timerInterval = null
    }
  }, [alert])

  return (
    <ListItem
      button
      divider
      key={alert.id}
      {...(action && {
        onClick: () => action(alert.id),
      })}
    >
      <ListItemAvatar>
        <Avatar className={classes.icon}>
          <SvgIcon fontSize="small">
            <WhatshotIcon />
          </SvgIcon>
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        style={{ paddingRight: 32 }}
        primary={`Alerta Cliente: ${alert?.customer?.name}`}
        primaryTypographyProps={{ variant: 'subtitle2', color: 'textPrimary' }}
        secondary={`Ubicación Cámara: ${
          alert.camera?.location || 'Sin precisar'
        }`}
      />
      <ListItemSecondaryAction>
        <Typography variant="body2">{displayTimer}</Typography>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default NotificationItem
