import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import * as React from "react";
import { Alert } from "react-native";
import Index from "../index";
import Register from "../register";

jest.spyOn(Alert, "alert");

const mockPush = jest.fn();
const mockBack = jest.fn();
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
  }),
}));



describe("Register (Register Screen)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all fields correctly", () => {
    render(<Register />);

    expect(screen.getByText("Crear cuenta")).toBeTruthy();
    expect(screen.getByPlaceholderText("usuario123")).toBeTruthy();
    expect(screen.getByPlaceholderText("ejemplo@correo.com")).toBeTruthy();
    expect(screen.getByPlaceholderText("Ex4mpl3pa55")).toBeTruthy();
    expect(screen.getByPlaceholderText("Repite tu contraseña")).toBeTruthy();
    expect(screen.getByText("Registrarse")).toBeTruthy();
    expect(screen.getByText("← Atrás")).toBeTruthy();
  });

  it("shows alert when all fields are empty", async () => {
    render(<Register />);

    fireEvent.press(screen.getByText("Registrarse"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error",
        "Por favor, completa todos los campos"
      );
    });
  });

  it("shows alert when username is missing", async () => {
    const { getByPlaceholderText, getByText } = render(<Register />);

    fireEvent.changeText(
      getByPlaceholderText("ejemplo@correo.com"),
      "test@correo.com"
    );
    fireEvent.changeText(getByPlaceholderText("Ex4mpl3pa55"), "AaBbCc*?*?1");
    fireEvent.changeText(
      getByPlaceholderText("Repite tu contraseña"),
      "AaBbCc*?*?1"
    );

    fireEvent.press(getByText("Registrarse"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error",
        "Por favor, ingresa un nombre de usuario"
      );
    });
  });

  it("shows alert when email is missing", async () => {
    const { getByPlaceholderText, getByText } = render(<Register />);

    fireEvent.changeText(getByPlaceholderText("usuario123"), "usuarioTest");
    fireEvent.changeText(getByPlaceholderText("Ex4mpl3pa55"), "AaBbCc*?*?1");
    fireEvent.changeText(
      getByPlaceholderText("Repite tu contraseña"),
      "AaBbCc*?*?1"
    );

    fireEvent.press(getByText("Registrarse"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error",
        "Por favor, agrega un email"
      );
    });
  });

  it("shows alert when password is missing", async () => {
    const { getByPlaceholderText, getByText } = render(<Register />);

    fireEvent.changeText(getByPlaceholderText("usuario123"), "usuarioTest");
    fireEvent.changeText(
      getByPlaceholderText("ejemplo@correo.com"),
      "test@correo.com"
    );
    fireEvent.changeText(getByPlaceholderText("Repite tu contraseña"), "");

    fireEvent.press(getByText("Registrarse"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error",
        "Por favor, agrega una contraseña"
      );
    });
  });

  it("shows alert when confirm password is missing", async () => {
    const { getByPlaceholderText, getByText } = render(<Register />);

    fireEvent.changeText(getByPlaceholderText("usuario123"), "usuarioTest");
    fireEvent.changeText(
      getByPlaceholderText("ejemplo@correo.com"),
      "test@correo.com"
    );
    fireEvent.changeText(getByPlaceholderText("Ex4mpl3pa55"), "AaBbCc*?*?1");

    fireEvent.press(getByText("Registrarse"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error",
        "Por favor, confirma tu contraseña"
      );
    });
  });

  it("shows alert when email format is invalid", async () => {
    const { getByPlaceholderText, getByText } = render(<Register />);

    fireEvent.changeText(getByPlaceholderText("usuario123"), "usuarioTest");
    fireEvent.changeText(
      getByPlaceholderText("ejemplo@correo.com"),
      "invalidemail"
    );
    fireEvent.changeText(getByPlaceholderText("Ex4mpl3pa55"), "AaBbCc*?*?1");
    fireEvent.changeText(
      getByPlaceholderText("Repite tu contraseña"),
      "AaBbCc*?*?1"
    );

    fireEvent.press(getByText("Registrarse"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error",
        "Por favor, ingresa un correo electrónico válido"
      );
    });
  });

  it("shows alert when passwords do not match", async () => {
    const { getByPlaceholderText, getByText } = render(<Register />);

    fireEvent.changeText(getByPlaceholderText("usuario123"), "usuarioTest");
    fireEvent.changeText(
      getByPlaceholderText("ejemplo@correo.com"),
      "test@correo.com"
    );
    fireEvent.changeText(getByPlaceholderText("Ex4mpl3pa55"), "AaBbCc*?*?1");
    fireEvent.changeText(
      getByPlaceholderText("Repite tu contraseña"),
      "AaBbCc*?*?2"
    );

    fireEvent.press(getByText("Registrarse"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error",
        "Las contraseñas no coinciden"
      );
    });
  });

  it("shows password validation errors", async () => {
    const { getByPlaceholderText, getByText } = render(<Register />);

    fireEvent.changeText(getByPlaceholderText("usuario123"), "usuarioTest");
    fireEvent.changeText(
      getByPlaceholderText("ejemplo@correo.com"),
      "test@correo.com"
    );
    fireEvent.changeText(getByPlaceholderText("Ex4mpl3pa55"), "aabbcc*?*?1");
    fireEvent.changeText(
      getByPlaceholderText("Repite tu contraseña"),
      "aabbcc*?*?1"
    );

    fireEvent.press(getByText("Registrarse"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error en Contraseña",
        "La contraseña debe contener:\n• una letra mayúscula"
      );
    });
  });

  it("shows success alert when registration is valid", async () => {
    const { getByPlaceholderText, getByText } = render(<Register />);

    fireEvent.changeText(getByPlaceholderText("usuario123"), "usuarioTest");
    fireEvent.changeText(
      getByPlaceholderText("ejemplo@correo.com"),
      "test@correo.com"
    );
    fireEvent.changeText(getByPlaceholderText("Ex4mpl3pa55"), "AaBbCc*?*?1");
    fireEvent.changeText(
      getByPlaceholderText("Repite tu contraseña"),
      "AaBbCc*?*?1"
    );

    fireEvent.press(getByText("Registrarse"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "¡Éxito!",
        "Registro exitoso.\nUsuario: usuarioTest",
        [
          {
            text: "OK",
            onPress: expect.any(Function),
          },
        ]
      );
    });
  });

  it("navigates back to login when pressing ← Atrás", async () => {
    render(<Register />);

    fireEvent.press(screen.getByTestId("register-back-button"));

    await waitFor(() => {
      expect(mockBack).toHaveBeenCalled();
    });
  });
});
