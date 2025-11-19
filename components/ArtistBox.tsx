import { Artist } from "@/types";
import styled from "styled-components/native";
import { View, Image, Text } from "react-native";

const MainContainer = styled.View`
  margin: 5px;
  background-color: white;
  flex-direction: row;
  shadow-color: brack;
  shadow-opacity: 0.1;
  shadow-offset: 1px -2px;
  elevation: 2;
`;

const ImageContainer = styled.Image`
  width: 150px;
  height: 150px;
  resize-mode: contain;
`;

const Info = styled.Text`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Name = styled.Text`
  font-size: 20px;
  margin-top: 10px;
  color: #333;
`;

interface Props {
  artist: Artist;
}
const ArtistBox = ({ artist }: Props) => {
  return (
    <MainContainer>
      <ImageContainer source={{ uri: artist.image }} />
      <Info>
        <Name>{artist.name}</Name>
      </Info>
    </MainContainer>
  );
};

export default ArtistBox;
