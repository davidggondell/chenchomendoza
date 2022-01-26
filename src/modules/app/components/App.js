import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline, Box, Collapse, Stack } from '@mui/material';

import theme from '../ThemeConfig';
import Body from './Body';
import Footer from './Footer';
import { ThemeProvider } from '@mui/material/styles';
import Sidebar from './Sidebar';

const App = () => {
    const sidebarWidth = 240;
    const collapsedSidebarWidth = 58;
    const [sidebarOpened, setSidebarOpened] = React.useState(true);
    return (
        <React.StrictMode>
            <Router>
                <ThemeProvider theme={theme}>
                    <CssBaseline>
                        <Sidebar
                            open={sidebarOpened}
                            toogle={() => setSidebarOpened(!sidebarOpened)}
                            sidebarWidth={sidebarWidth}
                            collapsedSidebarWidth={collapsedSidebarWidth}
                        />
                        <Stack direction="row">
                            <Box>
                                <Collapse

                                    in={sidebarOpened}
                                    orientation="horizontal"
                                    collapsedSize={collapsedSidebarWidth}
                                >
                                    <Box sx={{ width: sidebarWidth + "px" }}></Box>
                                </Collapse>
                            </Box>
                            <Box>
                                <Body />
                                <Footer />
                            </Box>
                        </Stack>
                    </CssBaseline>
                </ThemeProvider>
            </Router>
        </React.StrictMode >
    );

}

export default App;