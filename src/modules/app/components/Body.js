import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Box } from '@mui/material';
import { ImageGrid } from '../../images';
import { AboutMe, Contact } from '../../about';

const Body = () => {
    const [firstLoad, setFirstLoad] = React.useState(true)
    const history = useHistory();

    useEffect(() => {
        if (firstLoad) {
            history.replace("/")
        }
        setFirstLoad(false)
    }, [history, firstLoad])

    return (
        <Box sx={{ overflowX: "hidden" }}>
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
