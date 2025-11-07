import {
  ActionsContainer,
  BtnView,
  ConfirmPasswView,
  CorreoView,
  LabelView,
  MainContainer,
  PasswView,
  ScreenContent,
  TitleText,
  UsuarioView,
} from "@/components";
import { validarEmail, validarPasswrd } from "@/helpers";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, Text, TextInput } from "react-native";

export default function Index() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    // 1. Validar campos vacíos
    if (!username && !email && !password && !confirmPassword) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }
    if (!username) {
      Alert.alert("Error", "Por favor, ingresa un nombre de usuario");
      return;
    }
    if (!password) {
      Alert.alert("Error", "Por favor, agrega una contraseña");
      return;
    }
    if (!email) {
      Alert.alert("Error", "Por favor, agrega un email");
      return;
    }
    if (!confirmPassword) {
      Alert.alert("Error", "Por favor, confirma tu contraseña");
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert("Error", "Por favor, ingresa un correo electrónico válido");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    // 3. Validar formato de contraseña con retroalimentación
    const resultadoPassw = validarPasswrd(password);

    if (!resultadoPassw.isValid) {
      // Genera el mensaje de error con las deficiencias
      const mensajeError =
        resultadoPassw.errores.length > 0
          ? "La contraseña debe contener:\n• " +
            resultadoPassw.errores.join("\n• ")
          : "Por favor, ingresa una contraseña válida."; // Caso de reserva

      // Muestra la alerta. No se modifican los states, por lo tanto, no se borra el texto.
      Alert.alert("Error en Contraseña", mensajeError);
      return; // Detiene la ejecución si la contraseña es inválida
    }

    // 4. Si todo está bien, guardar datos y mostrar éxito
    const userData = {
      username: username,
      email: email,
      password: password,
      timestamp: new Date().toISOString(),
    };

    console.log("Datos guardados:", userData);

    Alert.alert("¡Éxito!", "Registro exitoso.\nUsuario: " + userData.username, [
      {
        text: "OK",
        onPress: () => {
          // Si quieres limpiar después del éxito, descomenta estas líneas:
          // setUsername("");
          // setEmail("");
          // setPassword("");
          // setConfirmPassword("");
        },
      },
    ]);
  };

  const handleLogin = () => {
    router.push("./");
  };

  // ... (JSX del componente)
  return (
    <MainContainer>
      <ScreenContent>
        <TitleText>Crear cuenta</TitleText>

        <LabelView>
          <Text>Nombre de usuario:</Text>
        </LabelView>
        <UsuarioView>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="usuario123"
            autoCapitalize="none"
          />
        </UsuarioView>

        <LabelView>
          <Text>Correo:</Text>
        </LabelView>
        <CorreoView>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="ejemplo@correo.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </CorreoView>

        <LabelView>
          <Text>Contraseña:</Text>
        </LabelView>
        <PasswView>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Ex4mpl3pa55"
            secureTextEntry={true} // oculta la contraseña
            autoCapitalize="none"
          />
        </PasswView>

        <LabelView>
          <Text>Repetir contraseña:</Text>
        </LabelView>
        <ConfirmPasswView>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Repite tu contraseña"
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </ConfirmPasswView>
      </ScreenContent>

      <ActionsContainer>
        <BtnView>
          <Button
            title="Registrarse"
            onPress={handleSubmit}
            color="lightblack"
          />
        </BtnView>
        <BtnView style={{ marginBottom: 0 }}>
          <Button
            title="Iniciar Sesión"
            onPress={handleLogin}
            color="lightblack"
          />
        </BtnView>
      </ActionsContainer>
    </MainContainer>
  );
}
