import ArtistList from "@/components/ArtistList";
import { Artist } from "@/types";
import { fireEvent, render, screen } from "@testing-library/react-native";
import * as React from "react";

// Mock de expo-router
const mockPush = jest.fn();
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock de ArtistBox
jest.mock("@/components/ArtistBox", () => {
  const { View, Text, TouchableOpacity } = require("react-native");
  return function ArtistBox({ artist }: { artist: Artist }) {
    return (
      <View testID={`artist-box-${artist.id}`}>
        <Text>{artist.name}</Text>
      </View>
    );
  };
});

describe("ArtistList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockArtists: Artist[] = [
    { id: 1, name: "Artist 1", image: "https://example.com/image1.jpg" },
    { id: 2, name: "Artist 2", image: "https://example.com/image2.jpg" },
    { id: 3, name: "Artist 3", image: "https://example.com/image3.jpg" },
  ];

  it("renders correctly with artists", () => {
    render(<ArtistList artists={mockArtists} />);

    expect(screen.getByTestId("artist-1")).toBeTruthy();
    expect(screen.getByTestId("artist-2")).toBeTruthy();
    expect(screen.getByTestId("artist-3")).toBeTruthy();
  });

  it("renders correctly with empty array", () => {
    render(<ArtistList artists={[]} />);

    // FlatList debería renderizarse pero sin items
    expect(screen.queryByTestId("artist-1")).toBeNull();
  });

  it("navigates to ArtistDetailsView when artist is pressed", () => {
    render(<ArtistList artists={mockArtists} />);

    const artistButton = screen.getByTestId("artist-1");
    fireEvent.press(artistButton);

    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/ArtistDetailsView",
      params: {
        id: 1,
        name: "Artist 1",
        image: "https://example.com/image1.jpg",
      },
    });
  });

  it("navigates with correct params for different artists", () => {
    render(<ArtistList artists={mockArtists} />);

    const artistButton = screen.getByTestId("artist-2");
    fireEvent.press(artistButton);

    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/ArtistDetailsView",
      params: {
        id: 2,
        name: "Artist 2",
        image: "https://example.com/image2.jpg",
      },
    });
  });

  it("uses correct keyExtractor for FlatList", () => {
    const { UNSAFE_root } = render(<ArtistList artists={mockArtists} />);
    const flatList = UNSAFE_root.findByType(require("react-native").FlatList);

    expect(flatList).toBeTruthy();
    expect(flatList.props.keyExtractor(mockArtists[0], 0)).toBe("artist-0");
    expect(flatList.props.keyExtractor(mockArtists[1], 1)).toBe("artist-1");
  });

  it("renders all artists in the list", () => {
    render(<ArtistList artists={mockArtists} />);

    expect(screen.getByText("Artist 1")).toBeTruthy();
    expect(screen.getByText("Artist 2")).toBeTruthy();
    expect(screen.getByText("Artist 3")).toBeTruthy();
  });
});
