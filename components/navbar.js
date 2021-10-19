import React, { useContext } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { GlobalContext } from '../context/context';
import Router from 'next/router';

export default function NavbarComponent() {
    const { user,setUser } = useContext(GlobalContext);

    return (
        <Navbar bg="light" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand href="/">tabtracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                {user && user != null ? (
                    <>
                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                            <Nav>
                                <Nav.Link href="/song/create">Create Song</Nav.Link>
                                <NavDropdown title={user?.name} id="basic-nav-dropdown">
                                <NavDropdown.Item href="/profile">View Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={()=> {
                                        localStorage.clear();
                                        setUser(null);
                                        Router.push('/');
                                    }}>Log out</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </>
                ) : (
                    <>
                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                            <Nav>
                                <Nav.Link href="/register">Register</Nav.Link>
                                <Nav.Link href="/login">Login</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </>
                )}
            </Container>
        </Navbar>
    )
}