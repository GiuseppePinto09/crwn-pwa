import React from 'react';
import * as S from './header.styles';

//redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';

//utils
import { ReactComponent as Logo } from '../../assets/crown.svg';

//components
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

const Header = ({ currentUser, hidden, signOutStart }) => (
  <S.Header>
    <S.LogoContainer to='/'>
      <Logo className='logo' />
    </S.LogoContainer>
    <S.Options>
      <S.OptionLink to='/shop'>SHOP</S.OptionLink>
      <S.OptionLink to='/shop'>CONTACT</S.OptionLink>
      {currentUser ? (
        <S.OptionLink
          as='div' //notice the "as={<Component>/<HTMLtag>}" feature from "styled-components"
          onClick={signOutStart} //(5.1) once i click "SIGN OUT" i fired the "START" redux action ...
        >
          SIGN OUT
        </S.OptionLink>
      ) : (
        <S.OptionLink to='/signin'>SIGN IN</S.OptionLink>
      )}
      <CartIcon />
    </S.Options>
    {hidden ? null : <CartDropdown />}
  </S.Header>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
