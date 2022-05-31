//import styled from 'styled-components/native'
import {black, white} from './colors';
import styled from 'styled-components/native';

type InputContainerProps = {
  width: string;
};

export const Input = styled.TextInput`
  border-width: 0.5px;
  height: 40px;
  border-radius: 4px;
  padding-horizontal: 15px;
`;

export const InputContainer = styled.View`
  margin-vertical: 10px;
  width: 100%;
`;

export const Label = styled.Text`
  color: ${black};
  margin-bottom: 7.5px;
  font-size: 13px;
`;
export const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;
