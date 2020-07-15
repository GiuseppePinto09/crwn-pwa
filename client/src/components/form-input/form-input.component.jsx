import React from 'react';
import * as S from './form-input.styles';

const FormInput = ({ handleChange, label, ...otherProps }) => (
  <S.FormInput>
    <S.Input onChange={handleChange} {...otherProps} />
    {label ? (
      <S.Label valueLength={otherProps.value.length}>{label}</S.Label>
    ) : null}
  </S.FormInput>
);

export default FormInput;
