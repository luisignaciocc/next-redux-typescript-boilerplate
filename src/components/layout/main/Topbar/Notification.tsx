import React, { useState, useEffect, useRef } from 'react'
import {
  IconButton,
  Badge,
  Popover,
  Box,
  Typography,
  List,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined'
import { useSocket } from 'src/lib/socketio-hook'
import { useAlerts, useNewAlert } from 'src/hooks/useSocketService'
import { useRouter } from 'next/router'
import { NotificationItem } from './components'
import { AlertModel } from 'src/services'
import { AlertState } from 'src/utils/keys'

const useStyles = makeStyles((theme) => ({
  popover: {
    width: 420,
  },
  icon: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
}))

const Notification = () => {
  const classes = useStyles()

  const router = useRouter()

  const { alertData, alertSocket, alertSubscribe } = useAlerts()
  const { newAlertData, newAlertSocket, newAlertSubscribe } = useNewAlert()

  const [notifications, setNotifications] = useState<AlertModel[]>([])

  const { socket, subscribe } = useSocket(
    'alert_state_changed',
    (data: { id: number; state: AlertState }) => {
      if (
        data.state == AlertState.APPROVED ||
        data.state == AlertState.UNAPPROVED
      ) {
        setNotifications((notifications) =>
          notifications.filter((n) => n.id != data.id)
        )
      }
    }
  )
  const { subscribe: subscribeAllSeen } = useSocket(
    'seen_all_alerts_by_admin',
    () => {
      setNotifications([])
    }
  )

  const ref = useRef(null)
  const [isOpen, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const goToAlert = (id: number | undefined) => {
    handleClose()
    router.push('/alerts/[id]', `/alerts/${id}`)
  }

  const handleGotoAlerts = () => {
    socket?.emit('seen_all_alerts_by_admin')
    handleClose()
    router.push('/alerts')
  }

  useEffect(() => {
    if (alertSocket) alertSubscribe()
  }, [alertSocket])

  useEffect(() => {
    if (alertData) {
      setNotifications(alertData.alerts)
    }
  }, [alertData])

  useEffect(() => {
    if (socket) {
      subscribe
      subscribeAllSeen
    }
  }, [socket])

  useEffect(() => {
    if (newAlertSocket) newAlertSubscribe()
  }, [newAlertSocket])

  useEffect(() => {
    if (newAlertData) {
      setNotifications([newAlertData, ...notifications])
    }
  }, [newAlertData])

  return (
    <>
      <IconButton color="inherit" ref={ref} onClick={handleOpen}>
        <Badge
          badgeContent={notifications.length}
          color="error"
          variant="standard"
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        classes={{ paper: classes.popover }}
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
      >
        <Box p={2}>
          <Typography variant="h5" color="textPrimary">
            Notifications
          </Typography>
        </Box>
        {notifications.length === 0 ? (
          <Box p={2}>
            <Typography variant="h6" color="textPrimary">
              No tienes nuevas alertas
            </Typography>
          </Box>
        ) : (
          <>
            <List disablePadding>
              {notifications.map((notification) => (
                <NotificationItem
                  key={`alert-${notification.id}`}
                  alert={notification}
                  action={goToAlert}
                />
              ))}
            </List>
            <Box p={1} display="flex" justifyContent="center">
              <Button size="small" onClick={handleGotoAlerts}>
                Ver todas
              </Button>
            </Box>
          </>
        )}
      </Popover>
    </>
  )
}
export default Notification
