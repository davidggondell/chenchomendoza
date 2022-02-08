import { createTheme } from '@mui/material/styles';
//import '@fontsource/quicksand';
//import '@fontsource/open-sans'

// mode: 'dark',
//         background: {
//             default: '#0f0f0f',
//             paper: '#0f0f0f'
//         },
// background: {
//     default: "#fffcf2",
//     paper: "#fffcf2"
// }

const theme = createTheme({
    palette: {
        divider: "rgba(0, 0, 0, 0)",
    },
    typography: {
        fontFamily: "Montserrat"
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