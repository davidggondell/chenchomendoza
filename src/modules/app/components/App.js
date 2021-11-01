import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';

const App = () => {

    return (
        <div>
            <Router>
                <div>
                    <Header/>
                    <Body/>
                </div>
            </Router>
            <Footer/>
        </div>
    );

}
    
export default App;