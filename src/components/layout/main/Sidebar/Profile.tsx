import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Avatar from 'react-nice-avatar';
import { makeStyles } from '@material-ui/core';
import { Avatar as MUIAvatar, Typography } from '@material-ui/core';
import { useAuthUser } from 'src/hooks';

type Props = {
  className?: string;
};

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
}));

const Profile = (props: Props) => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const authUser = useAuthUser();

  const [user, setUser] = useState({
    email: 'Cargando...',
    avatar: '',
  });

  useEffect(() => {
    if (authUser) {
      setUser({
        email: authUser.split('@')[0],
        avatar: '',
      });
    }
  }, [authUser]);

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      {user.avatar ? (
        <MUIAvatar
          variant="square"
          alt="Person"
          className={classes.avatar}
          src={user.avatar}
          imgProps={{
            className: classes.avatarImg,
          }}
        />
      ) : (
        <Avatar className={classes.avatarDefault} />
      )}
      <Typography className={classes.name} variant="h4">
        {user.email}
      </Typography>
      <Typography variant="body2">Guest</Typography>
    </div>
  );
};

export default Profile;
