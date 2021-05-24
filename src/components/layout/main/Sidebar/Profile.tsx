import React, { useContext, useState, useEffect } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core'
import { Avatar, Typography } from '@material-ui/core'
import { AuthContext } from 'src/contexts'

type Props = {
  className?: string
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
  },
  avatarDefault: {
    width: 60,
    height: 60,
  },
  avatar: {
    width: 'auto',
    height: 60,
  },
  avatarImg: {
    width: 'auto',
    height: '100%',
  },
  name: {
    marginTop: theme.spacing(1),
  },
}))

const Profile = (props: Props) => {
  const { className, ...rest } = props

  const classes = useStyles()

  const { profile } = useContext(AuthContext)
  const [user, setUser] = useState({
    name: 'Cargando...',
    surname: '',
    avatar: '',
    bio: '',
  })

  useEffect(() => {
    // console.log(profile);

    if (profile) {
      setUser({
        name: profile.name.split(' ')[0],
        surname: profile.surname,
        avatar: profile.avatar ?? '',
        bio: profile.isAdmin ? 'System Admin' : 'Admin',
      })
    }
  }, [profile])

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      {user.avatar ? (
        <Avatar
          variant="square"
          alt="Person"
          className={classes.avatar}
          // component={RouterLink}
          src={user.avatar}
          imgProps={{
            className: classes.avatarImg,
          }}
        >
          {user.name.charAt(0) +
            (user.surname ? user.surname.charAt(0) : user.name.charAt(1))}
        </Avatar>
      ) : (
        <Avatar alt="NA" className={classes.avatarDefault} src={user.avatar}>
          {user.name.charAt(0) +
            (user.surname ? user.surname.charAt(0) : user.name.charAt(1))}
        </Avatar>
      )}
      <Typography className={classes.name} variant="h4">
        {`${user.name} ${user.surname ?? ''}`}
      </Typography>
      <Typography variant="body2">{user.bio}</Typography>
    </div>
  )
}

export default Profile
