import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#0f0f0f',
            paper: '#0f0f0f'
        },
        divider: "rgba(0, 0, 0, 0)"
    }
})

export default theme;