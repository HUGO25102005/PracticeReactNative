import {
  ActionsContainer,
  BoxImage,
  BtnView,
  CorreoView,
  LabelView,
  MainContainer,
  PasswView,
  RedViewWithImage,
  ScreenContent,
  TitleText,
} from "@/components";
import { validarEmail, validarPasswrd } from "@/helpers";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, Text, TextInput } from "react-native";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    // 1. Validar campos vacíos
    if (!email && !password) {
      Alert.alert("Error", "Por favor, llena ambos campos");
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

    if (!validarEmail(email)) {
      Alert.alert("Error", "Por favor, ingresa un correo electrónico válido");
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
      email: email,
      password: password,
      timestamp: new Date().toISOString(),
    };

    // console.log("Datos guardados:", userData);

    Alert.alert(
      "¡Éxito!",
      "Inicio de sesión exitoso.\nCorreo: " + userData.email,
      [
        {
          text: "OK",
          onPress: () => {
            // Si quieres limpiar después del éxito, descomenta estas líneas:
            // setEmail('');
            // setPassword('');
          },
        },
      ]
    );
  };

  const handleRegister = () => {
    router.push("./register");
  };

  // ... (JSX del componente)
  return (
    <MainContainer>
      <ScreenContent>
        <RedViewWithImage>
          <BoxImage
            source={require("./../assets/images/person_512dp_292929_FILL0_wght500_GRAD0_opsz48.png")}
            resizeMode="cover"
            testID="icon-image"
          />
        </RedViewWithImage>

        <TitleText>Iniciar sesión</TitleText>

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
      </ScreenContent>

      <ActionsContainer>
        <BtnView>
          <Button
            title="Iniciar Sesión"
            onPress={handleSubmit}
            color="lightblack"
          />
        </BtnView>
        <BtnView style={{ marginBottom: 0 }}>
          <Button
            title="Registrarse"
            onPress={handleRegister}
            color="lightblack"
          />
        </BtnView>
      </ActionsContainer>
    </MainContainer>
  );
}
