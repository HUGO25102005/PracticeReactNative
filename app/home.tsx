import ArtistList from "@/components/ArtistList";
import { useArtist } from "@/hooks";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

const MainContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
`;

export const Home = () => {
  const { artists } = useArtist();
  return (
    <MainContainer>
      {artists ? (
        <ArtistList artists={artists} />
      ) : (
        <Text>No hay artistas</Text>
      )}
    </MainContainer>
  );
};

export default Home;
