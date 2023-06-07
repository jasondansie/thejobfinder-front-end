import React from 'react';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import { Outlet } from 'react-router-dom';
import NavMenu from '../components/NavMenu';

const Layout: React.FC = () => {
    return (
        <div>
            <Row>   
                <NavMenu />
            </Row>
            <Container>       
                
                <Row>
                    <Outlet />
                </Row>              
            </Container>
        </div>       
    );
};
export default Layout;