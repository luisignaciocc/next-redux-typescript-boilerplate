import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'src/hooks';
import {
  Container,
  Grid,
  makeStyles,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  // FormControlLabel,
  // Checkbox,
  IconButton,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { signIn } from 'src/services/';
import validator from 'validator';
import { selectIsLoggedIn } from 'src/redux/slices';
import { loginAction } from 'src/redux/slices/authSlice';

const useStyle = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  formContainer: {},
  card: {},
  cardHeader: {
    padding: theme.spacing(4),
    textAlign: 'center',
  },
  cardContent: {
    padding: theme.spacing(4),
    textAlign: 'left',
  },
  brand: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    width: 180,
  },
  input: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
  checkbox: {
    marginTop: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
  infoAlert: {
    marginTop: 24,
  },
}));

const LoginPage: () => React.ReactElement | null = () => {
  const classes = useStyle();

  const isLoged = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formBody, setFormBody] = useState({ email: '', password: '' });
  const [formBodyErrors, setFormBodyErrors] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (input: string, text: string) => {
    setFormBody({ ...formBody, [input]: text });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (ev: any) => {
    ev.preventDefault();
    setIsFetching(true);

    let hasErrors = false;
    const newFormBodyErrors = { email: '', password: '' };

    if (!formBody.email || formBody.email === '') {
      newFormBodyErrors.email = 'Debes ingresar tu email';
      hasErrors = true;
    } else if (!validator.isEmail(formBody.email)) {
      newFormBodyErrors.email = 'Debes ingresar un email v??lido';
      hasErrors = true;
    }
    if (!formBody.password || formBody.password === '') {
      newFormBodyErrors.password = 'Debes ingresar tu contrase??a';
      hasErrors = true;
    }

    setFormBodyErrors(newFormBodyErrors);
    if (!hasErrors) {
      const response = await signIn(formBody);
      if (response.token) {
        dispatch(loginAction({ user: response.email, token: response.token }));
      } else {
        setFormBodyErrors({ ...formBodyErrors, email: 'Error fetching' });
      }
    }
    setIsFetching(false);
  };

  useEffect(() => {
    if (isLoged) {
      window.location.href = '/';
    } else {
      setLoading(false);
    }
  }, [isLoged]);

  return loading ? null : (
    <Container>
      <Grid
        container
        className={classes.root}
        alignContent="center"
        justify="center"
      >
        <Grid item className={classes.formContainer} xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <div className={classes.cardHeader}>
                {/* <img className={classes.brand} src='/images/brand.png' /> */}
                <Typography variant="h3" color="secondary">
                  Iniciar Sesi??n
                </Typography>
              </div>
              <form method="POST" onSubmit={handleSubmit}>
                <TextField
                  error={formBodyErrors.email !== ''}
                  helperText={formBodyErrors.email}
                  className={classes.input}
                  name="email"
                  label="Email *"
                  onChange={(e) =>
                    handleInputChange('email', e.target.value.trim())
                  }
                />

                <TextField
                  error={formBodyErrors.password !== ''}
                  helperText={formBodyErrors.password}
                  className={classes.input}
                  name="password"
                  label="Contrase??a *"
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) =>
                    handleInputChange('password', e.target.value.trim())
                  }
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={handleShowPassword}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    ),
                  }}
                />
                {/* <FormControlLabel
                  className={classes.checkbox}
                  control={
                    <Checkbox name="remember" />
                  } label="Recuerdame" /> */}
                <Button
                  disabled={isFetching}
                  variant="contained"
                  fullWidth
                  color="primary"
                  className={classes.submitButton}
                  type="submit"
                >
                  Ingresar
                </Button>
              </form>
              <Alert severity="info" className={classes.infoAlert}>
                Ingresa con cualquier combinaci??n de usuario y contrase??a
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;

/* <FormControl>
  <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
</FormControl> */
