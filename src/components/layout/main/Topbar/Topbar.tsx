import React, { useContext } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core'
import { AppBar, Toolbar, Hidden, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import InputIcon from '@material-ui/icons/Input'
import Link from '../../../../components/Link'
import Notification from './Notification'
import SearchView from './SearchView'
import { AuthContext } from 'src/contexts'

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
  },
  brand: {
    height: 30,
  },
  flexGrow: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
}))

type Props = {
  className?: string
  onSidebarOpen: () => any
}

const Topbar = (props: Props) => {
  const { className, onSidebarOpen, ...rest } = props

  const classes = useStyles()

  const { token, handleLogout } = useContext(AuthContext)

  const handleSignOut = () => {
    if (token) {
      handleLogout()
    }
  }

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <Hidden mdDown>
          <Link href="/">
            <img
              className={classes.brand}
              alt="Logo"
              src="/images/acot-logo-blanco.png"
            />
          </Link>
        </Hidden>
        <div className={classes.flexGrow}>
          <SearchView />
        </div>
        <Notification />
        <Hidden mdDown>
          <IconButton
            className={classes.signOutButton}
            color="inherit"
            onClick={handleSignOut}
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

export default Topbar
