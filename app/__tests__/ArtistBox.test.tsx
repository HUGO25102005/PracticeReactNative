import ArtistBox from "@/components/ArtistBox";
import { Artist } from "@/types";
import { render, screen } from "@testing-library/react-native";
import * as React from "react";
import { Image } from "react-native";

describe("ArtistBox Component", () => {
  const mockArtist: Artist = {
    id: 1,
    name: "Test Artist",
    image: "https://example.com/test-image.jpg",
  };

  it("renders correctly with artist data", () => {
    render(<ArtistBox artist={mockArtist} />);

    expect(screen.getByText("Test Artist")).toBeTruthy();
  });

  it("displays artist name correctly", () => {
    const artistWithLongName: Artist = {
      id: 2,
      name: "Very Long Artist Name That Should Still Display",
      image: "https://example.com/image.jpg",
    };

    render(<ArtistBox artist={artistWithLongName} />);

    expect(
      screen.getByText("Very Long Artist Name That Should Still Display")
    ).toBeTruthy();
  });

  it("renders image with correct source", () => {
    const { UNSAFE_getByType } = render(<ArtistBox artist={mockArtist} />);
    const image = UNSAFE_getByType(Image);

    expect(image).toBeTruthy();
    expect(image.props.source.uri).toBe("https://example.com/test-image.jpg");
  });

  it("handles different image URLs", () => {
    const artistWithDifferentImage: Artist = {
      id: 3,
      name: "Another Artist",
      image: "https://different-url.com/artist.jpg",
    };

    const { UNSAFE_getByType } = render(
      <ArtistBox artist={artistWithDifferentImage} />
    );
    const image = UNSAFE_getByType(Image);

    expect(image.props.source.uri).toBe("https://different-url.com/artist.jpg");
  });

  it("renders with empty image URL", () => {
    const artistWithEmptyImage: Artist = {
      id: 4,
      name: "Artist Without Image",
      image: "",
    };

    const { UNSAFE_getByType } = render(
      <ArtistBox artist={artistWithEmptyImage} />
    );
    const image = UNSAFE_getByType(Image);

    expect(image.props.source.uri).toBe("");
    expect(screen.getByText("Artist Without Image")).toBeTruthy();
  });

  it("renders multiple ArtistBox components correctly", () => {
    const artists: Artist[] = [
      { id: 1, name: "Artist 1", image: "https://example.com/1.jpg" },
      { id: 2, name: "Artist 2", image: "https://example.com/2.jpg" },
    ];

    const { rerender } = render(<ArtistBox artist={artists[0]} />);
    expect(screen.getByText("Artist 1")).toBeTruthy();

    rerender(<ArtistBox artist={artists[1]} />);
    expect(screen.getByText("Artist 2")).toBeTruthy();
  });
});
