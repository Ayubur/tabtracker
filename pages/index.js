import React, { useState,useContext,useEffect } from 'react';
import { Container, Card, Row, Col, Image, Button } from 'react-bootstrap';
import styles from '../styles/Home.module.css';

import NavbarComponent from '../components/navbar';
import Footer from '../components/footer';

import Link from 'next/link';

import { GlobalContext } from '../context/context';
import config from '../utils/config';

export default function Home({songs}) {
    const {setSongs}= useContext(GlobalContext);
    useEffect(()=>{
        if(songs){
            setSongs(songs);
        }
    },[songs])
    return (
        <>
            <NavbarComponent />
            <Container className="mt-3">
                {songs && songs.map((el,i) => (
                    <Card className="mt-1" key={i}>
                        <Card.Body>
                            <Row>
                                <Col xs={12} md={4} sm={6} lg={4}>
                                    <Image
                                        style={{ height: 200, marginBottom: 20 }}
                                        width="100%"
                                        src={`/images/${el.albumImage}`}
                                        rounded
                                    />
                                </Col>
                                <Col xs={12} md={8} sm={6} lg={8}>
                                    <h4>{el.title}</h4>
                                    <ul style={{ paddingLeft: 0 }}>
                                        <li><b>Artist : </b> <span>{el.artist}</span></li>
                                        <li><b>Genre : </b> <span>{el.genre}</span></li>
                                        <li><b>Album : </b> <span>{el.album}</span></li>
                                        <li style={{ marginTop: 10 }}>
                                            <Link href={`/song/${el._id}`}>
                                                <Button variant="primary">view details</Button>
                                            </Link>
                                        </li>
                                    </ul>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                ))}
            </Container>

            <Footer />
        </>
    )
}

export async function getServerSideProps(context) {
    const res = await fetch(`${config.CLIENT_URL}/api/songs`);
    const data = await res.json();
    return {
      props: {songs:data.songs},
    }
  }
