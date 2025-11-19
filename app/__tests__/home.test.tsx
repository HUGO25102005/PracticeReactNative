import { render, screen, waitFor } from "@testing-library/react-native";
import * as React from "react";
import Home from "../home";

// Mock del hook useArtist
jest.mock("@/hooks", () => ({
  useArtist: jest.fn(),
}));

import { useArtist } from "@/hooks";

// Mock de ArtistList
jest.mock("@/components/ArtistList", () => {
  const { View, Text } = require("react-native");
  return function ArtistList({ artists }: { artists: any[] }) {
    return (
      <View testID="artist-list">
        {artists.map((artist) => (
          <Text key={artist.id} testID={`artist-${artist.id}`}>
            {artist.name}
          </Text>
        ))}
      </View>
    );
  };
});

describe("Home Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly when artists are loaded", async () => {
    const mockArtists = [
      { id: 1, name: "Artist 1", image: "https://example.com/image1.jpg" },
      { id: 2, name: "Artist 2", image: "https://example.com/image2.jpg" },
    ];

    (useArtist as jest.Mock).mockReturnValue({
      artists: mockArtists,
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByTestId("artist-list")).toBeTruthy();
    });
  });

  it("renders correctly when artists is null", () => {
    (useArtist as jest.Mock).mockReturnValue({
      artists: null,
    });

    const { queryByTestId } = render(<Home />);

    expect(queryByTestId("artist-list")).toBeNull();
  });

  it("renders correctly when artists is undefined", () => {
    (useArtist as jest.Mock).mockReturnValue({
      artists: undefined,
    });

    const { queryByTestId } = render(<Home />);

    expect(queryByTestId("artist-list")).toBeNull();
  });

  it("renders correctly when artists array is empty", async () => {
    (useArtist as jest.Mock).mockReturnValue({
      artists: [],
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByTestId("artist-list")).toBeTruthy();
    });
  });

  it("calls useArtist hook", () => {
    (useArtist as jest.Mock).mockReturnValue({
      artists: [],
    });

    render(<Home />);

    expect(useArtist).toHaveBeenCalled();
  });
});
