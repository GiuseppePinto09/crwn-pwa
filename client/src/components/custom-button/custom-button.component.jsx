import React from 'react';
import * as S from './custom-button.styles';

const CustomButton = ({ children, ...props }) => (
  <S.CustomButton {...props}>{children}</S.CustomButton>
);

export default CustomButton;
