import { Card, Row, Col, Button, Image } from "react-bootstrap";
import Link from 'next/link';

export default function RecentlyViewedSongs({ songs }) {
    return (
        songs?.length > 0 ? (
            <>
                {songs.map((el, i) => (
                    <Card className="mt-1" key={i}>
                        <Card.Body>
                            <Row>
                                <Col xs={12} md={4} sm={6} lg={4}>
                                    <Image
                                        style={{ height: 200, marginBottom: 20 }}
                                        width="100%"
                                        src={el.albumImage}
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
                                            <Link href={`/song/${el.id}`}>
                                                <Button variant="primary">view details</Button>
                                            </Link>
                                        </li>
                                    </ul>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                ))}
            </>
        ) : (
            <p style={{textAlign:'center'}}>No songs to view</p>
        )
    )
}