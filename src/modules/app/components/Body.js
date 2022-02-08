import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Box } from '@mui/material';
import Home from './Home';
import { ImageGrid } from '../../images';

const Body = () => {

    return (
        <Box>
            <Switch>
                <Route exact path="/"><Home /></Route>
                <Route exact path="/inicio"><ImageGrid galleryUrl={"INICIO"} /></Route>
                <Route exact path="/naturaleza"><ImageGrid galleryUrl={"NATURALEZA"} /></Route>
                <Route exact path="/paisaje"><ImageGrid galleryUrl={"PAISAJE"} /></Route>
                <Route exact path="/retrato"><ImageGrid galleryUrl={"RETRATO"} /></Route>
                <Route exact path="/varios"><ImageGrid galleryUrl={"VARIOS"} /></Route>
                <Route><Home /></Route>
            </Switch>
        </Box>
    );

};

export default Body;
