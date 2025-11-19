import { getMusicData } from "@/services";

// Mock de getApiKey
jest.mock("@/config", () => ({
  getApiKey: jest.fn(() => "test-api-key"),
}));

// Mock global fetch
global.fetch = jest.fn();

describe("getMusicData Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and transforms music data correctly", async () => {
    const mockApiResponse = {
      artists: {
        artist: [
          {
            id: 1,
            name: "Artist 1",
            mbid: "mbid-1",
            image: [{ "#text": "https://example.com/image1.jpg" }],
          },
          {
            id: 2,
            name: "Artist 2",
            mbid: "mbid-2",
            image: [{ "#text": "https://example.com/image2.jpg" }],
          },
        ],
      },
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockApiResponse),
    });

    const result = await getMusicData();

    expect(result).toEqual([
      {
        id: 1,
        name: "Artist 1",
        image: "https://example.com/image1.jpg",
      },
      {
        id: 2,
        name: "Artist 2",
        image: "https://example.com/image2.jpg",
      },
    ]);
  });

  it("calls fetch with correct URL", async () => {
    const mockApiResponse = {
      artists: {
        artist: [],
      },
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockApiResponse),
    });

    await getMusicData();

    expect(global.fetch).toHaveBeenCalledWith(
      "https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=test-api-key&format=json",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  });

  it("handles empty artist array", async () => {
    const mockApiResponse = {
      artists: {
        artist: [],
      },
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockApiResponse),
    });

    const result = await getMusicData();

    expect(result).toEqual([]);
  });

  it("handles single artist", async () => {
    const mockApiResponse = {
      artists: {
        artist: [
          {
            id: 1,
            name: "Single Artist",
            mbid: "mbid-1",
            image: [{ "#text": "https://example.com/single.jpg" }],
          },
        ],
      },
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockApiResponse),
    });

    const result = await getMusicData();

    expect(result).toEqual([
      {
        id: 1,
        name: "Single Artist",
        image: "https://example.com/single.jpg",
      },
    ]);
  });

  it("handles fetch errors", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network error")
    );

    const result = await getMusicData();

    expect(consoleErrorSpy).toHaveBeenCalledWith("Error:", expect.any(Error));
    expect(result).toBeUndefined();

    consoleErrorSpy.mockRestore();
  });

  it("extracts image from first element of image array", async () => {
    const mockApiResponse = {
      artists: {
        artist: [
          {
            id: 1,
            name: "Artist with multiple images",
            mbid: "mbid-1",
            image: [
              { "#text": "https://example.com/small.jpg" },
              { "#text": "https://example.com/medium.jpg" },
              { "#text": "https://example.com/large.jpg" },
            ],
          },
        ],
      },
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockApiResponse),
    });

    const result = await getMusicData();

    expect(result?.[0]?.image).toBe("https://example.com/small.jpg");
  });

  it("handles empty image array", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    const mockApiResponse = {
      artists: {
        artist: [
          {
            id: 1,
            name: "Artist without image",
            mbid: "mbid-1",
            image: [],
          },
        ],
      },
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockApiResponse),
    });

    // Esto debería lanzar un error al intentar acceder a image[0]
    const result = await getMusicData();

    // El código actual maneja el error con console.error y retorna undefined
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(result).toBeUndefined();

    consoleErrorSpy.mockRestore();
  });
});
