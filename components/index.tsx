import styled from "styled-components/native";

export const MainContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 48px 24px 32px;
  background-color: #f5f5f5;
`;

export const ScreenContent = styled.View`
  flex: 1;
  width: 100%;
  max-width: 360px;
  align-self: stretch;
  align-items: center;
`;

export const TitleText = styled.Text`
  width: 100%;
  max-width: 320px;
  font-size: 28px;
  font-weight: 700;
  color: #2d2d2d;
  margin-bottom: 28px;
`;

export const HeaderActions = styled.View`
  width: 100%;
  max-width: 360px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 16px;
`;

export const NavButton = styled.TouchableOpacity`
  padding: 8px 14px;
  border-radius: 999px;
  background-color: #ffffff;
  border-width: 1px;
  border-color: #d9d9d9;
  shadow-color: #00000022;
  shadow-opacity: 0.08;
  shadow-radius: 6px;
  shadow-offset: 0px 3px;
  elevation: 1;
`;

export const NavButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #2d2d2d;
`;

export const TextBoxContainer = styled.View`
  width: 100%;
  max-width: 320px;
  height: 48px;
  background-color: #ffffff;
  border-width: 1px;
  border-color: #c5c5c5;
  border-radius: 12px;
  margin-bottom: 18px;
  padding: 0px 16px;
  justify-content: center;
  shadow-color: #00000033;
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  shadow-offset: 0px 4px;
  elevation: 1;
`;

export const RedViewWithImage = styled.View`
  justify-content: center;
  align-items: center;
`;

export const BoxImage = styled.Image`
  width: 250px;
  height: 180px;
  border-radius: 2px;
  margin-bottom: 50px;
`;

export const CorreoView = styled(TextBoxContainer)``;

export const PasswView = styled(TextBoxContainer)``;

export const UsuarioView = styled(TextBoxContainer)``;

export const ConfirmPasswView = styled(TextBoxContainer)``;

export const ActionsContainer = styled.View`
  width: 100%;
  max-width: 360px;
  padding-top: 32px;
  padding-bottom: 16px;
  margin-top: auto;
  align-items: center;
`;

export const BtnView = styled.View`
  width: 100%;
  max-width: 220px;
  margin-bottom: 16px;
`;

export const LabelView = styled.View`
  width: 100%;
  max-width: 320px;
  margin-bottom: 6px;
  align-items: flex-start;
`;
