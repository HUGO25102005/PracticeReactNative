import { MainContainer } from "@/components";
import { router, useLocalSearchParams } from "expo-router";
import { Button, Text } from "react-native";

const ArtistDetailsView = () => {
  const { id, name, image } = useLocalSearchParams();

  return (
    <MainContainer>
      <Text>{name}</Text>
      <Text>{image}</Text>
      <Text>{id}</Text>
      <Button title="Back" onPress={() => router.back()} color="lightblack" />
    </MainContainer>
  );
};

export default ArtistDetailsView;
