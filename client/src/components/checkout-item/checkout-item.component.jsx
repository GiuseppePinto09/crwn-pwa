import React from 'react';
import * as S from './checkout-item.styles';

//redux
import { connect } from 'react-redux';

import {
  clearItemFromCart,
  addItem,
  removeItem,
} from '../../redux/cart/cart.actions';

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <S.CheckoutItem>
      <S.ImageContainer>
        <img src={imageUrl} alt='item' />
      </S.ImageContainer>
      <S.Text>{name}</S.Text>
      <S.Quantity>
        <div onClick={() => removeItem(cartItem)}>&#10094;</div>
        <span className='value'>{quantity}</span>
        <div onClick={() => addItem(cartItem)}>&#10095;</div>
      </S.Quantity>
      <S.Price>{price}</S.Price>
      <S.RemoveButton onClick={() => clearItem(cartItem)}>
        &#10005;
      </S.RemoveButton>
    </S.CheckoutItem>
  );
};

const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(clearItemFromCart(item)),
  addItem: item => dispatch(addItem(item)),
  removeItem: item => dispatch(removeItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
