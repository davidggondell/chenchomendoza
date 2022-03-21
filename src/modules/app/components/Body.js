import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Box } from '@mui/material';
import { ImageGrid } from '../../images';
import { AboutMe, Contact } from '../../about';

const Body = () => {

    return (
        <Box>
            <Switch>
                <Route exact path="/"><ImageGrid galleryUrl={"INICIO"} /></Route>
                <Route exact path="/naturaleza"><ImageGrid galleryUrl={"NATURALEZA"} /></Route>
                <Route exact path="/paisaje"><ImageGrid galleryUrl={"PAISAJE"} /></Route>
                <Route exact path="/retrato"><ImageGrid galleryUrl={"RETRATO"} /></Route>
                <Route exact path="/otros"><ImageGrid galleryUrl={"OTROS"} /></Route>
                <Route exact path="/sobremi"><AboutMe /></Route>
                <Route exact path="/contacto"><Contact /></Route>
                <Route><ImageGrid galleryUrl={"INICIO"} /></Route>
            </Switch>
        </Box>
    );

};

export default Body;
