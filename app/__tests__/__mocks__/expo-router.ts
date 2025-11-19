export const mockBack = jest.fn();
export const mockPush = jest.fn();
export const mockReplace = jest.fn();
export const mockUseLocalSearchParams = jest.fn();

export const router = {
    back: mockBack,
    push: mockPush,
    replace: mockReplace,
};

export const useLocalSearchParams = () => mockUseLocalSearchParams();

export const useRouter = () => ({
    back: mockBack,
    push: mockPush,
    replace: mockReplace,
});

