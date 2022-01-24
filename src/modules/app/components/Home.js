import React from 'react';
import {FormattedMessage} from 'react-intl';
import {ImageGrid} from '../../images/'

const Home = () => (
    <div className="text-center">
        <FormattedMessage id="project.app.Home.welcome"/>
        <ImageGrid/>
    </div>
);

export default Home;
