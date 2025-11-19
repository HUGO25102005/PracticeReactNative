import { getApiKey } from "@/config";
import { ArtistResource } from "@/types"

const url = `https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${getApiKey()}&format=json`
export const getMusicData = async () => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then((response) => response.json())
        .then(data => data.artists.artist)
        .then(artists => artists.map((artist: ArtistResource) => {
            return {
                id: artist.id,
                name: artist.name,
                image: artist.image[0]['#text'],
            };
        }))
        .catch(error => console.error('Error:', error));

    return response;
};
