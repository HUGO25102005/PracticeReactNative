import { getMusicData } from "@/services";
import { Artist } from "@/types";
import { useEffect, useState } from "react";

const useArtist = () => {

    const [artists, setArtists] = useState<Artist[]>([]);

    const getArtists = async () => {
        const artists = await getMusicData();
        setArtists(artists);
    };
    useEffect(() => {
        getArtists();
    }, []);
    return { artists };
};

export default useArtist;
