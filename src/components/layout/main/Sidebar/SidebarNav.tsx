/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef } from 'react'
import clsx from 'clsx'
import Link, { LinkProps } from 'src/components/layout/Link'
import { makeStyles } from '@material-ui/core'
import { List, ListItem, Button, colors } from '@material-ui/core'
import palette from 'src/themes/main/palette'

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium,
  },
  icon: {
    color: palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1),
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main,
    },
  },
}))

const CustomRouterLink = forwardRef((props: LinkProps, ref: any) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <Link {...props} />
  </div>
))

type Props = {
  className?: string
  pages: any[]
  onItemClick?: () => any
}

const SidebarNav = (props: Props) => {
  const { pages, className, onItemClick, ...rest } = props

  const classes = useStyles()

  const handleItemClick = () => {
    onItemClick && onItemClick()
  }

  return (
    <List {...rest} className={clsx(classes.root, className)}>
      {pages.map((page: any) => (
        <ListItem className={classes.item} disableGutters key={page.title}>
          <Button
            activeClassName={classes.active}
            className={classes.button}
            component={CustomRouterLink}
            href={page.href}
            onClick={handleItemClick}
          >
            <div className={classes.icon}>{page.icon}</div>
            {page.title}
          </Button>
        </ListItem>
      ))}
    </List>
  )
}

export default SidebarNav
