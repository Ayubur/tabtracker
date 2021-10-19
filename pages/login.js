import React, { useState, useContext, useEffect } from "react";
import { Container, Card, Button, Form, Row, Col, Alert } from "react-bootstrap";
import NavbarComponent from "../components/navbar";
import Footer from "../components/footer";

import { GlobalContext } from "../context/context";
import Router from 'next/router';
import config from "../utils/config";

export default function Login() {
    const { user, setUser } = useContext(GlobalContext);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (user && user != null) {
            Router.push('/');
        }
    }, []);

    const _handleClick = (e) => {
        e.preventDefault();
        setError('');

        fetch(`${config.API_URL}/api/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                if (data && data.user) {
                    localStorage.clear();
                    setUser(data.user);
                    localStorage.setItem('user', JSON.stringify(data.user));

                    Router.push('/');

                } else {
                    setError('Invalid email or password');
                }
            })
            .catch((error) => {
                setError('Invalid email or password');
                console.error('Error:', error);
            });
    }

    return (
        <>
            <NavbarComponent />
            <Container className="mt-5">
                <Row>
                    <Col xs="12" md="8" sm="10" lg="8" className="offset-md-2 offset-sm-1 offset-lg-2">
                        <Card className="mb-3">
                            <Card.Body>
                                {error !== '' && (
                                    <Alert variant="danger">{error}</Alert>
                                )}
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                    </Form.Group>
                                    {email == '' || password == '' ?
                                        (<button className="btn btn-primary disabled">Login</button>) : (<button className="btn btn-primary" onClick={(e) => _handleClick(e)}>Login</button>)}
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}