import styled from "styled-components/native";

export const MainContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #EFEFEF;
  margin-bottom: 200px;
`;

export const TextBoxContainer = styled.View`
  width: 250px;
  height: 45px;
  background: white;
  border: solid darkgray 3px;
  border-radius: 10px;
  margin-bottom: 30px;
  padding-horizontal: 10px;
  justify-content: center;
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

export const BtnView = styled.View`
  margin-top: 30px;
  width: 160px;
`;

export const LabelView = styled.View`
  display: flex;
  justify-content: left;
  width: 250px;
  margin-bottom: 5px;
`;