import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import theme from '../ThemeConfig';
import Body from './Body';
import { ThemeProvider } from '@mui/material/styles';
import Sidebar from './Sidebar';
import Header from './Header';

const App = () => {
    const useAppbar = useMediaQuery(theme.breakpoints.down('md'));
    const [sidebarOpened, setSidebarOpened] = React.useState(false);
    const sidebarWidth = useAppbar ? 240 : 320;
    const appbarHeight = 50;
    const widthOffset = !useAppbar ? sidebarWidth : 0;
    const heightOffset = useAppbar ? appbarHeight : 0;

    return (
        <React.StrictMode>
            <Router>
                <ThemeProvider theme={theme}>
                    <CssBaseline>
                        {useAppbar &&
                            <Header
                                sideBarWidth={sidebarWidth}
                                appbarHeight={appbarHeight}
                                toogleSidebar={() => setSidebarOpened(!sidebarOpened)}
                            />
                        }
                        <Sidebar
                            open={sidebarOpened}
                            toogle={() => setSidebarOpened(!sidebarOpened)}
                            variant={useAppbar ? "temporary" : "permanent"}
                            sidebarWidth={sidebarWidth}
                        />

                        <Box
                            sx={{
                                paddingLeft: widthOffset + "px",
                                paddingTop: heightOffset + "px"
                            }}>
                            <Body />
                            {
                                //<Footer />
                            }
                        </Box>
                    </CssBaseline>
                </ThemeProvider>
            </Router>
        </React.StrictMode >
    );

}

export default App;