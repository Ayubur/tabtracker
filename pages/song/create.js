import React, { useState, useContext } from "react";
import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";

import NavbarComponent from "../../components/navbar";
import Footer from "../../components/footer";
import { GlobalContext } from "../../context/context";
import config from "../../utils/config";
import Router from "next/router";

export default function CreateSong() {
    const { user } = useContext(GlobalContext);
    const [reqData, setReqData] = useState({
        title: '',
        artist: '',
        genre: '',
        album: '',
        albumImage: '',
        youtubeId: '',
        lyrics: '',
        tab: '',
        creator: ''
    });


    const _upload = () => {
        fetch(`${config.API_URL}/api/songs/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${user?.token}`
            },
            body: JSON.stringify(reqData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                }
                if (data.success) {
                    Router.push(`/song/${data.song._id}`);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const _save = (e) => {
        e.preventDefault();

        reqData['creator'] = user._id;
        setReqData(reqData);

        // console.log("Req Data === ", reqData['albumImage']);

        let formData = new FormData();
        formData.append('file',reqData['albumImage']);

        fetch(`${config.API_URL}/imageUpload`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                }
                if (data.success) {
                    reqData['albumImage'] = data.filename;
                    setReqData(reqData);

                    _upload();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const _changeState = (key, val) => {
        reqData[key] = val;
        setReqData(reqData);
    }

    return (
        <>
            <NavbarComponent />
            <Container className="mt-4" style={{ marginBottom: 70 }}>
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
                                                <Form.Control type="text" placeholder="Enter title" onChange={(e) => _changeState('title', e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Artist</Form.Label>
                                                <Form.Control type="text" placeholder="Enter artist" onChange={(e) => _changeState('artist', e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Genre</Form.Label>
                                                <Form.Control type="text" placeholder="Enter genre" onChange={(e) => _changeState('genre', e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Album</Form.Label>
                                                <Form.Control type="text" placeholder="Enter album" onChange={(e) => _changeState('album', e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Album Image</Form.Label>
                                                <Form.Control type="file" placeholder="Enter album image url" onChange={(e) => _changeState('albumImage', e.target.files[0])} />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Youtube ID</Form.Label>
                                                <Form.Control type="text" placeholder="Enter youtube id" onChange={(e) => _changeState('youtubeId', e.target.value)} />
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={12} md={7} sm={7} lg={7}>
                                    <Card>
                                        <Card.Body>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Song Lyrics</Form.Label>
                                                <Form.Control as="textarea" rows={8} placeholder="Enter song lyrics" onChange={(e) => _changeState('lyrics', e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Guitar Tabs / Chords</Form.Label>
                                                <Form.Control as="textarea" rows={8} placeholder="Enter guitar tabs" onChange={(e) => _changeState('tab', e.target.value)} />
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <div className="mt-3" style={{ textAlign: 'right' }}>
                                <button className="btn btn-primary" onClick={(e) => _save(e)}>Save Song</button>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
            <Footer />
        </>
    )
}