import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Container, Typography } from '@mui/material';

const Footer = () => (
    <Container>
        <Typography>
            <FormattedMessage id="project.app.Footer.text" />
        </Typography>
    </Container>
);

export default Footer;
