import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import { NextPage } from 'next'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  content: {
    paddingTop: 150,
    textAlign: 'center',
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560,
  },
}))

type Props = {
  statusCode: number
  statusMessage?: string | null
}

const Error: NextPage<Props> = ({ statusCode, statusMessage }) => {
  const classes = useStyles()

  const getErrorTitle = () => {
    switch (statusCode) {
      case 404:
        return 'The page you are looking for isn’t here.'
      case 401:
        return 'Este código ya fue utilizado o ha expirado.'
      case 409:
        return statusMessage

      default:
        return 'The page you are looking for isn’t here.'
    }
  }
  const getErrorDescription = () => {
    switch (statusCode) {
      case 404:
        return 'You either tried some shady route or you came here by mistake.\nWhichever it is, try using the navigation'
      case 401:
        return 'Si estas intentando recuperar tu contraseña solicita un nuevo código desde tu app.'
      case 409:
        return ''
      default:
        return 'You either tried some shady route or you came here by mistake.\nWhichever it is, try using the navigation'
    }
  }
  const getErrorImage = (): string => {
    switch (statusCode) {
      case 404:
        return '/images/undraw_page_not_found_su7k.svg'
      case 401:
        return '/images/undraw_unauthorized_yr7a.svg'
      case 409:
        return ''
      default:
        return '/images/undraw_page_not_found_su7k.svg'
    }
  }

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item lg={6} xs={12}>
          <div className={classes.content}>
            <Typography variant="h1">{getErrorTitle()}</Typography>
            <Typography variant="subtitle2">{getErrorDescription()}</Typography>
            {statusCode == 409 ? null : (
              <img
                alt="Under development"
                className={classes.image}
                src={getErrorImage()}
              />
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

Error.getInitialProps = async ({ props, res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return {
    ...props,
    statusCode: statusCode,
  }
}

export default Error
