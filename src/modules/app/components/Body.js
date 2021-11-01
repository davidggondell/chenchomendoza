import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './Home';

const Body = () => {
    
   return (
        <div className="container">
            <br/>
            <Switch>
                <Route exact path="/"><Home/></Route>
                <Route><Home/></Route>
            </Switch>
        </div>

    );

};

export default Body;
