import React from 'react';
import * as S from './sign-in-and-sign-up.styles';

//components
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

const SignInAndSignUpPage = () => (
  <S.SignInAndSignUpPage>
    <SignIn />
    <SignUp />
  </S.SignInAndSignUpPage>
);

export default SignInAndSignUpPage;
