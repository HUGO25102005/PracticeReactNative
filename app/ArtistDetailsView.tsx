import {
  HeaderActions,
  MainContainer,
  NavButton,
  NavButtonText,
  ScreenContent,
} from "@/components";
import ArtistBox from "@/components/ArtistBox";
import { router, useLocalSearchParams } from "expo-router";

const ArtistDetailsView = () => {
  const { id, name, image } = useLocalSearchParams();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <MainContainer>
      <ScreenContent>
        <HeaderActions>
          <NavButton onPress={handleGoBack} testID="artist-details-back-button">
            <NavButtonText>← Atrás</NavButtonText>
          </NavButton>
        </HeaderActions>

        <ArtistBox
          artist={{
            id: Number(id),
            name: name as string,
            image: image as string,
          }}
        />
      </ScreenContent>
    </MainContainer>
  );
};

export default ArtistDetailsView;
