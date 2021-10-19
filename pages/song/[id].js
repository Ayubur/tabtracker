import { useRouter } from "next/dist/client/router";

import { Container, Card, Row, Col, Image } from "react-bootstrap";
import NavbarComponent from "../../components/navbar";
import Footer from "../../components/footer";
import Head from 'next/head';
import config from "../../utils/config";


export default function Song({ song }) {
    const router = useRouter();
    const { id } = router.query;

    return (
        <>
            <Head>
                <title>{song?.title}</title>
                <meta property="og:url" content={`www.tabtracker.com/song/${song?.id}`} />
                <meta property="og:title" content={song?.title} />
                <meta property="og:image" content={song?.albumImage} />
            </Head>
            <NavbarComponent />
            <Container style={{ marginBottom: 70, marginTop: 20 }}>
                <Card>
                    <Card.Body>
                        <Card className="mt-1">
                            <Card.Body>
                                <Row>
                                    <Col xs={12} md={4} sm={6} lg={4}>
                                        <Image
                                            style={{ height: 200, marginBottom: 20 }}
                                            width="100%"
                                            src={song?.albumImage}
                                            rounded
                                        />
                                    </Col>
                                    <Col xs={12} md={8} sm={6} lg={8}>
                                        <h4>Amar Pothchola</h4>
                                        <ul style={{ paddingLeft: 0 }}>
                                            <li><b>Artist : </b> <span>{song?.title}</span></li>
                                            <li><b>Genre : </b> <span>{song?.genre}</span></li>
                                            <li><b>Album : </b> <span>{song?.album}</span></li>
                                        </ul>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>

                        <Card className="mt-1">
                            <Card.Body>
                                <Card.Title>Lyrics</Card.Title>
                                <pre>
                                    {song?.lyrics}
                                </pre>
                            </Card.Body>
                        </Card>

                        <Card className="mt-1">
                            <Card.Body>
                                <Card.Title>Tabs</Card.Title>
                                <pre>
                                    {song?.tab}
                                </pre>
                            </Card.Body>
                        </Card>
                    </Card.Body>
                </Card>
            </Container>
            <Footer />
        </>
    );
}

export async function getServerSideProps({ query }) {
    const res = await fetch(`${config.API_URL}/api/songs/${query.id}`);
    let data = await res.json();
    return {
        props: { song: data[0] }, // will be passed to the page component as props
    }
}

// export const getStaticProps = async ({ params }) => {
//     const song = songs.filter((el) => el.id.toString() == params.id);
//     return {
//         props: {
//             song: song[0]
//         }
//     }
// }

// export const getStaticPaths = async () => {
//     const paths = songs.map(el => ({
//         params: { id: el.id.toString() }
//     }));

//     return { paths, fallback: false };
// }