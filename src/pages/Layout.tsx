import React from 'react';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { Outlet } from 'react-router-dom';


const Layout: React.FC = () => {
    return (
        <Container fluid>
            <Row>
                <nav>
                    <Navbar bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand href="/home">TheJobFinder</Navbar.Brand>
                            <Nav className="me-auto">
                                <LinkContainer to="/jobList">
                                    <Nav.Link>Jobs</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/addjob">
                                    <Nav.Link>Add a Job</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/resume">
                                    <Nav.Link>Resume</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/interviewTips">
                                    <Nav.Link>Interview tips</Nav.Link>
                                </LinkContainer>
                            </Nav>
                        </Container>
                    </Navbar>
                    <br />
                </nav>
            </Row>
            <Row>
                <Outlet />
            </Row>
        </Container>
    );
};

export default Layout;
