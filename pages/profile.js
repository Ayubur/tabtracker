import React, { useState, useContext, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import NavbarComponent from "../components/navbar";
import RecentlyViewedSongs from "../components/recentlyViewedSongs";
import BookmarkedSongs from "../components/bookmarkedSongs";
import Footer from "../components/footer";
import { GlobalContext } from "../context/context";
import config from "../utils/config";

export default function Profile() {
    const [current, setCurrent] = useState(1);
    const { songs, user } = useContext(GlobalContext);
    const [bookmarkedSongs, setBookmarkedSongs] = useState([]);
    const [recentlyViewedSongs, setRecentlyViewedSongs] = useState([]);

    useEffect(() => _fetchSongs(), [user]);

    const _fetchSongs = () => {
        let promises = [];

        const promises1 = fetch(`${config.API_URL}/api/${user?._id}/songs/bookmark`, {
            headers: new Headers({
                'Authorization': `${user?.token}`,
            })
        }).then(res => ({ key: 'bookmarked', data: res?.json() }));

        const promises2 = fetch(`${config.API_URL}/api/${user?._id}/songs/viewedSongs`, {
            headers: new Headers({
                'Authorization': `${user?.token}`,
            })
        }).then(res => ({ key: 'recentlyviewed', data: res?.json() }));


        promises.push(promises1);
        promises.push(promises2);

        Promise.all(promises).then(res => {
            res.map(el => {
                el?.data.then(r =>
                    el?.key == 'bookmarked' ? setBookmarkedSongs(r) : setRecentlyViewedSongs(r)
                )
            })
        })

    }

    return (
        <>
            <NavbarComponent />
            <Container>
                <Card style={{ marginTop: 25, marginBottom: 70 }}>
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
                                {current == 1 ? (<RecentlyViewedSongs songs={recentlyViewedSongs} />) : (<BookmarkedSongs songs={bookmarkedSongs} />)}
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
            <Footer />
        </>
    )
}