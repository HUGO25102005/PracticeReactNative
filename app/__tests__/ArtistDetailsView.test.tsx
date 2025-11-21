import { fireEvent, render, screen } from "@testing-library/react-native";
import * as React from "react";
import { Image } from "react-native";

// Mock de expo-router usando __mocks__
jest.mock("expo-router");

import ArtistDetailsView from "../ArtistDetailsView";
import { mockBack, mockUseLocalSearchParams } from "./__mocks__/expo-router";

// Mock de MainContainer
jest.mock("@/components", () => ({
  MainContainer: ({ children }: { children: React.ReactNode }) => {
    const { View } = require("react-native");
    return <View testID="main-container">{children}</View>;
  },
}));

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
    const image = screen.UNSAFE_getByType(Image);
    expect(image).toBeTruthy();
    expect(image.props.source.uri).toBe("https://example.com/image.jpg");
    expect(screen.getByText("1")).toBeTruthy();
  });

  it("displays all artist information correctly", () => {
    mockUseLocalSearchParams.mockReturnValue({
      id: "123",
      name: "Pink Floyd",
      image: "https://lastfm.freetls.fastly.net/i/u/174s/pinkfloyd.jpg",
    });

    render(<ArtistDetailsView />);

    expect(screen.getByText("Pink Floyd")).toBeTruthy();
    expect(screen.getByText("123")).toBeTruthy();
    const image = screen.UNSAFE_getByType(Image);
    expect(image).toBeTruthy();
    expect(image.props.source.uri).toBe(
      "https://lastfm.freetls.fastly.net/i/u/174s/pinkfloyd.jpg"
    );
  });

  it("navigates back when back button is pressed", () => {
    mockUseLocalSearchParams.mockReturnValue({
      id: "1",
      name: "Test Artist",
      image: "https://example.com/image.jpg",
    });

    render(<ArtistDetailsView />);

    const backButton = screen.getByText("Back");
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

    // Los componentes Text deberían renderizarse aunque estén vacíos
    const texts = screen.getAllByText("");
    expect(texts.length).toBeGreaterThan(0);
  });

  it("handles empty string params", () => {
    mockUseLocalSearchParams.mockReturnValue({
      id: "",
      name: "",
      image: "",
    });

    render(<ArtistDetailsView />);

    const texts = screen.getAllByText("");
    expect(texts.length).toBeGreaterThan(0);
  });

  it("renders back button with correct title", () => {
    mockUseLocalSearchParams.mockReturnValue({
      id: "1",
      name: "Test Artist",
      image: "https://example.com/image.jpg",
    });

    render(<ArtistDetailsView />);

    const backButton = screen.getByText("Back");
    expect(backButton).toBeTruthy();
  });
});
