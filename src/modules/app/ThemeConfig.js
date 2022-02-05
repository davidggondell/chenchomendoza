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
        fontFamily: "Lato"
    },
    components: {
        MuiIconButton: {
            styleOverrides: {
                root: {
                    '&:focus': {
                        outline: 0,
                        border: 0,
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    '&:focus': {
                        outline: 0
                    }
                }
            }
        },
    }
})

export default theme;