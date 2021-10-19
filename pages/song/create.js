import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";

import NavbarComponent from "../../components/navbar";
import Footer from "../../components/footer";

export default function CreateSong() {
    return (
        <>
            <NavbarComponent />
            <Container className="mt-4" style={{marginBottom:70}}>
                <Card>
                    <Card.Body>
                        <Card.Title>Create Song</Card.Title>
                        <Card.Text>
                            <Row>
                                <Col xs={12} md={5} sm={5} lg={5}>
                                    <Card>
                                        <Card.Body>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control type="text" placeholder="Enter title" />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Artist</Form.Label>
                                                <Form.Control type="text" placeholder="Enter artist" />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Genre</Form.Label>
                                                <Form.Control type="text" placeholder="Enter genre" />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Album</Form.Label>
                                                <Form.Control type="text" placeholder="Enter album" />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Album Image Url</Form.Label>
                                                <Form.Control type="text" placeholder="Enter album image url" />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Youtube ID</Form.Label>
                                                <Form.Control type="text" placeholder="Enter youtube id" />
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={12} md={7} sm={7} lg={7}>
                                    <Card>
                                        <Card.Body>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Song Lyrics</Form.Label>
                                                <Form.Control as="textarea" rows={8} placeholder="Enter song lyrics" />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Guitar Tabs</Form.Label>
                                                <Form.Control as="textarea" rows={8} placeholder="Enter guitar tabs" />
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <div className="mt-3" style={{ textAlign: 'right' }}>
                                <Button variant="primary">Save song</Button>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
            <Footer />
        </>
    )
}