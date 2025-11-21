import { router, useLocalSearchParams } from "expo-router";
import { Button, Text } from "react-native";
import styled from "styled-components/native";
const ImageContainer = styled.Image`
  width: 100px;
  height: 100px;
  resize-mode: contain;
`;
const MainContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Name = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;
const Id = styled.Text`
  font-size: 16px;
  color: #333;
`;
const ArtistDetailsView = () => {
  const { id, name, image } = useLocalSearchParams();

  return (
    <MainContainer>
      <Name>{name}</Name>
      <ImageContainer source={{ uri: image as string }} />
      {id && <Id>{id}</Id>}
      <Button title="Back" onPress={() => router.back()} color="lightblack" />
    </MainContainer>
  );
};

export default ArtistDetailsView;
