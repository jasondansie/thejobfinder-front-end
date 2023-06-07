import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';

const NavMenu = () => {
    return (
        <nav>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>
                        <LinkContainer to="/home">
                            <Nav.Link>TheJobFinder</Nav.Link>
                        </LinkContainer>
                    </Navbar.Brand>
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
    ); 
};

export default NavMenu;