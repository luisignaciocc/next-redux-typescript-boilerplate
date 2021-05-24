import React, { useContext } from 'react'
import clsx from 'clsx'
import {
  Button,
  Hidden,
  makeStyles,
  Typography,
  Divider,
  Drawer,
} from '@material-ui/core'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PeopleIcon from '@material-ui/icons/People'
import WorkIcon from '@material-ui/icons/Work'
import VideocamIcon from '@material-ui/icons/Videocam'
import WhatshotIcon from '@material-ui/icons/Whatshot'
import ExploreIcon from '@material-ui/icons/Explore'
import { Profile, SidebarNav } from './components'
import palette from '../../../../themes/main/palette'
import { AuthContext } from 'src/contexts'
import InputIcon from '@material-ui/icons/Input'

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    zIndex: 1000,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)',
    },
  },
  root: {
    backgroundColor: palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2),
  },
  logout: {
    textTransform: 'none',
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
}))

type Props = {
  className?: string
  onClose?: () => any
  open: boolean
  variant: 'permanent' | 'persistent' | 'temporary'
}

const Sidebar = (props: Props) => {
  const { open, variant, onClose, className, ...rest } = props
  const { handleLogout } = useContext(AuthContext)

  const classes = useStyles()

  const pages = [
    {
      title: 'Panel',
      href: '/dashboard',
      icon: <DashboardIcon />,
    },
    {
      title: 'Clientes',
      href: '/customers',
      icon: <WorkIcon />,
    },
    {
      title: 'Usuarios',
      href: '/users',
      icon: <PeopleIcon />,
    },
    {
      title: 'Alertas',
      href: '/alerts',
      icon: <WhatshotIcon />,
    },
    {
      title: 'Cámaras',
      href: '/cameras',
      icon: <VideocamIcon />,
    },
    {
      title: 'Mapa',
      href: '/map',
      icon: <ExploreIcon />,
    },
    /* {
      title: 'Centro de Seguridad',
      href: '/security',
      icon: <SecurityIcon />
    }, */
  ]

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
          onItemClick={onClose}
        />
        <Hidden mdUp>
          <Divider className={classes.divider} />
          <Button
            variant="text"
            startIcon={<InputIcon color="error" fontSize="small" />}
            onClick={() => handleLogout()}
          >
            <Typography color="error" className={classes.logout}>
              Cerrar Sesión
            </Typography>
          </Button>
        </Hidden>
      </div>
    </Drawer>
  )
}

export default Sidebar
