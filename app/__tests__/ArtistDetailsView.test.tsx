import { fireEvent, render, screen } from "@testing-library/react-native";
import * as React from "react";
import { Image } from "react-native";

// Mock de expo-router usando __mocks__
jest.mock("expo-router");

import ArtistDetailsView from "../ArtistDetailsView";
import { mockBack, mockUseLocalSearchParams } from "./__mocks__/expo-router";

// Mock de componentes de @/components
jest.mock("@/components", () => {
  const React = require("react");
  const { View, Text, TouchableOpacity } = require("react-native");
  return {
    MainContainer: ({ children }: { children: React.ReactNode }) => {
      return <View testID="main-container">{children}</View>;
    },
    ScreenContent: ({ children }: { children: React.ReactNode }) => {
      return <View testID="screen-content">{children}</View>;
    },
    HeaderActions: ({ children }: { children: React.ReactNode }) => {
      return <View testID="header-actions">{children}</View>;
    },
    NavButton: ({
      children,
      onPress,
      testID,
    }: {
      children: React.ReactNode;
      onPress: () => void;
      testID?: string;
    }) => {
      return (
        <TouchableOpacity onPress={onPress} testID={testID}>
          {children}
        </TouchableOpacity>
      );
    },
    NavButtonText: ({ children }: { children: React.ReactNode }) => {
      return <Text>{children}</Text>;
    },
  };
});

jest.mock("@/components/ArtistBox", () => {
  const React = require("react");
  const { View, Image, Text } = require("react-native");
  return function ArtistBox({
    artist,
  }: {
    artist: { id: number; name: string; image: string };
  }) {
    return (
      <View testID="artist-box">
        <Text>{artist.name}</Text>
        <Image source={{ uri: artist.image }} />
      </View>
    );
  };
});

describe("ArtistDetailsView Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseLocalSearchParams.mockClear();
    mockBack.mockClear();
  });

  it("renders correctly with artist params", () => {
    mockUseLocalSearchParams.mockReturnValue({
      id: "1",
      name: "Test Artist",
      image: "https://example.com/image.jpg",
    });

    render(<ArtistDetailsView />);

    expect(screen.getByText("Test Artist")).toBeTruthy();
    const images = screen.UNSAFE_getAllByType(Image);
    const artistImage = images.find(
      (img) => img.props.source?.uri === "https://example.com/image.jpg"
    );
    expect(artistImage).toBeTruthy();
  });

  it("displays all artist information correctly", () => {
    mockUseLocalSearchParams.mockReturnValue({
      id: "123",
      name: "Pink Floyd",
      image: "https://lastfm.freetls.fastly.net/i/u/174s/pinkfloyd.jpg",
    });

    render(<ArtistDetailsView />);

    expect(screen.getByText("Pink Floyd")).toBeTruthy();
    const images = screen.UNSAFE_getAllByType(Image);
    const artistImage = images.find(
      (img) =>
        img.props.source?.uri ===
        "https://lastfm.freetls.fastly.net/i/u/174s/pinkfloyd.jpg"
    );
    expect(artistImage).toBeTruthy();
  });

  it("navigates back when back button is pressed", () => {
    mockUseLocalSearchParams.mockReturnValue({
      id: "1",
      name: "Test Artist",
      image: "https://example.com/image.jpg",
    });

    render(<ArtistDetailsView />);

    const backButton = screen.getByText("← Atrás");
    fireEvent.press(backButton);

    expect(mockBack).toHaveBeenCalled();
  });

  it("handles missing params gracefully", () => {
    mockUseLocalSearchParams.mockReturnValue({
      id: undefined,
      name: undefined,
      image: undefined,
    });

    render(<ArtistDetailsView />);

    expect(screen.getByText("← Atrás")).toBeTruthy();
  });

  it("handles empty string params", () => {
    mockUseLocalSearchParams.mockReturnValue({
      id: "",
      name: "",
      image: "",
    });

    render(<ArtistDetailsView />);

    // El componente debería renderizarse aunque los params estén vacíos
    expect(screen.getByText("← Atrás")).toBeTruthy();
  });

  it("renders back button with correct title", () => {
    mockUseLocalSearchParams.mockReturnValue({
      id: "1",
      name: "Test Artist",
      image: "https://example.com/image.jpg",
    });

    render(<ArtistDetailsView />);

    const backButton = screen.getByText("← Atrás");
    expect(backButton).toBeTruthy();
  });
});
