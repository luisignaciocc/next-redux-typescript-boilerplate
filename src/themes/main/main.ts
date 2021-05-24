import { createMuiTheme } from '@material-ui/core/styles'
import typography from './typography'
import palette from './palette'
import overrides from './overrides'

// Create a theme instance.
const theme = createMuiTheme({
  palette: palette,
  typography: typography,
  overrides: overrides,
})

export default theme
