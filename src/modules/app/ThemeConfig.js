import { createTheme } from '@mui/material/styles';
//import '@fontsource/quicksand';
//import '@fontsource/open-sans'

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#0f0f0f',
            paper: '#0f0f0f'
        },
        divider: "rgba(0, 0, 0, 0)"
    },
    typography: {
        fontFamily: "Advent Pro"
    }
})

export default theme;