import { useRouter } from "next/dist/client/router";
import { useContext, useState,useEffect } from "react";
import { Container, Card, Row, Col, Image } from "react-bootstrap";
import NavbarComponent from "../../components/navbar";
import Footer from "../../components/footer";
import Head from 'next/head';
import config from "../../utils/config";

import { GlobalContext } from "../../context/context";


export default function Song({ song }) {
    const router = useRouter();
    const { id } = router.query;
    const { user,setUser } = useContext(GlobalContext);

    const [isBookmarked, setIsBookmarked]=useState(false);

    useEffect(()=> {
        if(!user?.bookmarkedSongs.includes(id)){
            setIsBookmarked(false);
        }else{
            setIsBookmarked(true);
        }
    },[user]);

    const bookmarkSong = () => {
        fetch(`${config.API_URL}/api/songs/${id}/bookmark`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${user?.token}`
            },
        })
            .then(response => response.json())
            .then(data => {
                if(data.success){
                    setUser(data.user);
                    if(!data.user.bookmarkedSongs.includes(id)){
                        setIsBookmarked(false);
                    }else{
                        setIsBookmarked(true);
                    }
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

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
                                            src={`/images/${song?.albumImage}`}
                                            rounded
                                        />
                                    </Col>
                                    <Col xs={12} md={8} sm={6} lg={8}>
                                        <h4>{song?.title}</h4>
                                        <ul style={{ paddingLeft: 0 }}>
                                            <li><b>Artist : </b> <span>{song?.artist}</span></li>
                                            <li><b>Genre : </b> <span>{song?.genre}</span></li>
                                            <li><b>Album : </b> <span>{song?.album}</span></li>
                                        </ul>
                                        <div>
                                            <button className="btn btn-sm btn-primary ">Share to Facebook</button>
                                            {
                                                user !== null && !isBookmarked ? (
                                                    <button className="btn btn-sm btn-success" style={{ marginLeft: 5 }} onClick={()=> bookmarkSong()}>Bookmark</button>
                                                ):
                                                (
                                                    <button className="btn btn-sm btn-success" style={{ marginLeft: 5 }}>unbookmark</button>
                                                )
                                            }
                                        </div>
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
                                <Card.Title>Tabs / Chords</Card.Title>
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