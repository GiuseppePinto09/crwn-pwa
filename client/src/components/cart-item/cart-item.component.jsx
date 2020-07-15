import React from 'react';
import * as S from './cart-item.styles';

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
  <S.CartItem>
    <S.Image src={imageUrl} alt='item' />
    <S.Details>
      <span>{name}</span>
      <span>
        {quantity} x ${price}
      </span>
    </S.Details>
  </S.CartItem>
);

//(11.) using "React.memo", here
//bc all the "CartItem"s on the "CartDropdown" get RE-RENDERS
//everytime a new "CartItem" gets put into te "CartDropdown"
//even if its the same "CartItem", the only thing that changes is the "quantity"
//so we have "React.memo" it, in order to solve it!
export default React.memo(CartItem);
