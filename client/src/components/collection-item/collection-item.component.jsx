import React from 'react';
import * as S from './collection-item.styles';

//redux
import { connect } from 'react-redux';

import { addItem } from '../../redux/cart/cart.actions';

const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item;

  return (
    <S.CollectionItem>
      <S.BackgroundImage className='image' imageUrl={imageUrl} />
      <S.Footer>
        <S.Name>{name}</S.Name>
        <S.Price>{price}</S.Price>
      </S.Footer>
      <S.AddButton onClick={() => addItem(item)} inverted>
        Add to cart
      </S.AddButton>
    </S.CollectionItem>
  );
};

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
