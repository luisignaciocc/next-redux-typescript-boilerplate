import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core'
import { AppBar, Toolbar } from '@material-ui/core'
import { Link } from 'src/components/layout'

const useStyles = makeStyles((_theme) => ({
  root: {
    boxShadow: 'none',
  },
  brand: {
    height: 30,
  },
}))

type Props = {
  className?: string
}

const Topbar = (props: Props): React.ReactElement => {
  const { className, ...rest } = props

  const classes = useStyles()

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="inherit"
      position="static"
    >
      <Toolbar>
        <Link href="/">
          <img
            className={classes.brand}
            alt="Logo"
            src="/images/logo-chilecompra-original.png"
          />
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default Topbar
