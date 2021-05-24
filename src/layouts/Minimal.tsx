import React from 'react'
import { makeStyles, Container } from '@material-ui/core'

import { Topbar } from 'src/components/layout/minimal'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  content: {
    padding: theme.spacing(4),
    height: '100%',
  },
}))

const Minimal = (props: {
  children: React.ReactElement
}): React.ReactElement => {
  const { children } = props

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Topbar />
      <main className={classes.content}>
        <Container maxWidth="lg">{children}</Container>
      </main>
    </div>
  )
}

export default Minimal
