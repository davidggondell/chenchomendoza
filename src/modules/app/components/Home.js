import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();

    useEffect(() => {
        history.push("/inicio");
    });

    return null;
};

export default Home;
