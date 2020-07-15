import React from 'react';
import * as S from './checkout.styles';

//redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectCartItems,
  selectCartTotal,
} from '../../redux/cart/cart.selectors';

//components
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

const CheckoutPage = ({ cartItems, total }) => (
  <S.CheckoutPage>
    <S.Header>
      <S.HeaderBlock>
        <span>Product</span>
      </S.HeaderBlock>
      <S.HeaderBlock>
        <span>Description</span>
      </S.HeaderBlock>
      <S.HeaderBlock>
        <span>Quantity</span>
      </S.HeaderBlock>
      <S.HeaderBlock>
        <span>Price</span>
      </S.HeaderBlock>
      <S.HeaderBlock>
        <span>Remove</span>
      </S.HeaderBlock>
    </S.Header>
    {cartItems.map(cartItem => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <S.Total>TOTAL: ${total}</S.Total>
    <S.WarningText>
      *Please use the following test credit card for payments*
      <br />
      4242 4242 4242 4242 - Any future data - Any 3 digits
    </S.WarningText>
    <StripeCheckoutButton price={total} />
  </S.CheckoutPage>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

export default connect(mapStateToProps)(CheckoutPage);
