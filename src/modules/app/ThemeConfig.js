import { createTheme } from '@mui/material/styles';


// components: {
//     MuiButton: {
//         styleOverrides: {

//         }
//     }
// }
const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#2e2e2e',
            paper: '#2e2e2e'
        }
    }
})

export default theme;