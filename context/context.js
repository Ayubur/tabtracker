import {createContext,useState,useEffect} from 'react';

const GlobalContext = createContext();

const GlobalContextProvider = ({children})=>{
    const [user, setUser]=useState(null);
    const [songs,setSongs]=useState([
        {
            "id":1,
            "title": "Oniket Prantor",
            "artist": "Artcell",
            "genre": "Band",
            "album": "Oniket Prantor",
            "albumImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRAkPI0szy-vx-YaLSYF1cCTXzigfcaIAfRtDVrKp9XOtw8w5vN",
            "youtubeId": "0whMydJNDvk",
            "lyrics": "",
            "tab": "",
            "_creator": null
    
        },
        {
            "id":2,
            "title": "Amar Sonar Bangla",
            "artist": "James",
            "genre": "Band",
            "album": "Sonar Bangla",
            "albumImage": "https://i.ytimg.com/vi/AQ8VdHiJqS8/maxresdefault.jpg",
            "youtubeId": "Pk4OgSpgqoE",
            "lyrics": "",
            "tab": "",
            "_creator": "5dca5baa6aa9031e0c46dda7"
        }
    ]);

    useEffect(()=>{
        if(localStorage.getItem('user')){
            let item = localStorage.getItem('user');
            item=JSON.parse(item);
            setUser(item);
        }
    },[])
    return <GlobalContext.Provider value={{
        user,
        setUser,
        songs,
        setSongs
    }}>{children}</GlobalContext.Provider>
}

export {GlobalContext,GlobalContextProvider};