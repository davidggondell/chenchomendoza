import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Box } from '@mui/material';
import Home from './Home';

const Body = () => {

    return (
        <Box >
            <Switch>
                <Route exact path="/"><Home /></Route>
                <Route><Home /></Route>
            </Switch>
        </Box>
    );

};

export default Body;
