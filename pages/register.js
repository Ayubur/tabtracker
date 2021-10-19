import React, { useState,useContext } from "react";
import { Container, Card, Button, Form, Row, Col,Alert } from "react-bootstrap";
import NavbarComponent from "../components/navbar";
import Footer from "../components/footer";
import config from "../utils/config";
import Router from 'next/router';

import { GlobalContext } from "../context/context";

export default function Register() {
    const {setUser}=useContext(GlobalContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error,setError]=useState('');

    const _handleClick = (e) => {
        e.preventDefault();

        fetch(`${config.API_URL}/api/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name,email,password}),
        })
            .then(response => response.json())
            .then(data => {
                if(data.error){
                    setError(data.error);
                }

                localStorage.setItem("user",JSON.stringify(data.user));
                setUser(data.user);

                Router.push('/');

            })
            .catch((error) => {
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
                                {error!=='' && (
                                    <Alert variant="danger">{error}</Alert>
                                )}
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                                    </Form.Group>
                                    {name == '' || email == '' || password == '' || confirmPassword == '' || password !== confirmPassword || password.length <6 ?
                                        (<button className="btn btn-primary disabled">Register</button>) : (<button className="btn btn-primary" onClick={(e) => _handleClick(e)}>Register</button>)}
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