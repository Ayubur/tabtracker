import React, { useState,useContext } from "react";
import { Container, Card } from "react-bootstrap";
import NavbarComponent from "../components/navbar";
import RecentlyViewedSongs from "../components/recentlyViewedSongs";
import BookmarkedSongs from "../components/bookmarkedSongs";
import Footer from "../components/footer";
import { GlobalContext } from "../context/context";

export default function Profile() {
    const [current, setCurrent] = useState(1);
    const {songs} = useContext(GlobalContext);

    return (
        <>
            <NavbarComponent />
            <Container>
                <Card style={{ marginTop: 25, marginBottom:70 }}>
                    <Card.Body>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0px', borderBottom: '1px solid #ccc' }}>
                                <div style={{ cursor: 'pointer', textAlign: 'center', flex: 1, color: current == 1 ? 'blue' : 'black' }} onClick={() => setCurrent(1)}>
                                    <span>Recently Viewed Songs</span>
                                </div>
                                <div style={{ cursor: 'pointer', textAlign: 'center', flex: 1, color: current == 2 ? 'blue' : 'black' }} onClick={() => setCurrent(2)}>
                                    <span>Bookmarked Songs</span>
                                </div>
                            </div>
                            <div style={{ marginTop: 20 }}>
                                {current == 1 ? (<RecentlyViewedSongs songs={songs}/>) : (<BookmarkedSongs songs={songs}/>)}
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
            <Footer />
        </>
    )
}