import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';

const NavMenu = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <nav>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>
            <LinkContainer to="/home">
              <Nav.Link>TheJobFinder</Nav.Link>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={handleToggle}
          />
          <Navbar.Collapse id="responsive-navbar-nav" in={expanded}>
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
    </nav>
  );
};

export default NavMenu;
