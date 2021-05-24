import React, { useContext } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import SearchIcon from '@material-ui/icons/Search'
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from '@material-ui/core/styles'
import { CustomerModel, CustomersService } from 'src/services'
import { AuthContext, MultiTenantContext } from 'src/contexts'
import { Typography } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgba(255,255,255,0.9)',
    },
  },
  overrides: {
    MuiInputBase: {
      root: {
        color: '#FFF',
        height: 45,
        display: 'flex',
        alignContent: 'center',
        backgroundColor: '#1c869e',
      },
    },
    MuiOutlinedInput: {
      root: {
        borderColor: 'transparent',
      },
      notchedOutline: {
        borderColor: 'transparent',
        '&:focus': {
          display: 'none',
        },
      },
    },
  },
})

const useStyles = makeStyles((theme) => ({
  input: {
    color: '#FFF',
    width: 300,
    [theme.breakpoints.down('md')]: {
      width: 200,
    },
  },
  overlay: {
    width: '100vw',
    height: 'calc(100vh - 64px)',
    backgroundColor: 'rgba(0,0,0,0.7)',
    position: 'absolute',
    left: 0,
    top: 64,
    [theme.breakpoints.down('md')]: {
      height: 'calc(100vh - 56px)',
      top: 56,
    },
  },
}))

const SearchView = () => {
  const classes = useStyles()

  const { token } = useContext(AuthContext)
  const { tenant /* , setTenant */ } = useContext(MultiTenantContext)

  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState<CustomerModel[]>([])
  const loading = open && options.length === 0

  React.useEffect(() => {
    if (token) {
      let active = true

      if (!loading) {
        return undefined
      }

      ;(async () => {
        const filter =
          'filter=' +
          encodeURIComponent(
            JSON.stringify({
              where: {
                is_active: true,
                host: {
                  neq: process.env.ADMIN_HOST,
                },
              },
            })
          )

        const response = await new CustomersService(token).find(filter)

        if (active && response && response.data) {
          setOptions(response.data)
        }
      })()

      return () => {
        active = false
      }
    }
  }, [loading, token])

  React.useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  const goToCustomer = (customer: CustomerModel) => {
    if (customer) {
      window.open(
        `https://${customer.host}/authorize?token=${token}&tenant-id=${customer.id}`
      )
    }
  }

  return (
    <ThemeProvider theme={theme}>
      {open && <div className={classes.overlay} />}
      <Autocomplete
        noOptionsText="Sin resultados"
        className={classes.input}
        // style={{ width: 300 }}
        open={open}
        onOpen={() => {
          setOpen(true)
        }}
        onClose={() => {
          setOpen(false)
        }}
        onChange={(_ev, value) => goToCustomer(value as CustomerModel)}
        loadingText="Cargando Clientes..."
        getOptionSelected={
          (_option, _value) => false /* option.name === value.name */
        }
        getOptionDisabled={(option) => `${option.id}` === tenant}
        getOptionLabel={(option) => option.name}
        options={options}
        renderOption={(customer) => <Typography>{customer.name}</Typography>}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Buscar cliente..."
            InputProps={{
              ...params.InputProps,
              startAdornment: <SearchIcon />,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </ThemeProvider>
  )
}

export default SearchView
