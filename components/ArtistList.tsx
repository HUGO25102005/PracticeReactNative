import { Artist } from "@/types";
import { useRouter } from "expo-router";
import {
  FlatList,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import ArtistBox from "./ArtistBox";

interface Props {
  artists: Artist[];
}
const ArtistList = ({ artists }: Props) => {
  const router = useRouter();

  const handlePress = (artist: Artist) => {
    router.push({
      pathname: "/ArtistDetailsView",
      params: {
        id: artist.id,
        name: artist.name,
        image: artist.image,
      },
    });
  };
  return (
    <View>
      <FlatList
        data={artists}
        keyExtractor={(item, index) => `artist-${index}`}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              testID={`artist-${item.id}`}
              onPress={() => handlePress(item)}
            >
              <ArtistBox artist={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ArtistList;
