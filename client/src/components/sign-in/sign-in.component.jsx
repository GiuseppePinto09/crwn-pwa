import React from 'react';
import * as S from './sign-in.styles';

//redux
import { connect } from 'react-redux';

import {
  googleSignInStart,
  emailSignInStart,
} from '../../redux/user/user.actions';

//components
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [userCredentials, setUserCredentials] = React.useState({
    email: '',
    password: '',
  });

  const { email, password } = userCredentials; //destructuring here, so the other methods, and the "return" has them ..

  const handleSubmit = async event => {
    event.preventDefault();
    //((((ALWAYS "DESTRUCTURE"!!!))))
    //(bc its GOOD PRACTICE!)
    //(3.1) when clicking the button that submits the form, this "handleSubmit" method gets triggered
    emailSignInStart(email, password); //and this action too!
  };

  const handleChange = event => {
    const { value, name } = event.target;

    //instead of the "setState({[name]: value})"
    //here, we are spreading all the "userCredentials" obj, and THEN .. changing one of their values ..
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <S.SignIn>
      <S.Title>I already have an account</S.Title>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          handleChange={handleChange}
          value={email}
          label='email'
          required
        />
        <FormInput
          name='password'
          type='password'
          value={password}
          handleChange={handleChange}
          label='password'
          required
        />
        <S.ButtonsContainer>
          <CustomButton type='submit'> Sign in </CustomButton>
          <CustomButton
            type='button' //by putting the type on "button" WE ARE NO LONGER "SUBMITTING" THE FORM (which would be the normal behaviour of any "button" INSIDE A "form")
            //(2.1) when clicking the google sign in button
            onClick={googleSignInStart}
            isGoogleSignIn
          >
            Sign in with Google
          </CustomButton>
        </S.ButtonsContainer>
      </form>
    </S.SignIn>
  );
};

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })), //((((((IMP)))))) //(3.1) we pass the "email" & "password" as an OBJECT! (since in the "payload" you CANNOT pass diff variables, but JUST ONE!)
});

export default connect(null, mapDispatchToProps)(SignIn);
