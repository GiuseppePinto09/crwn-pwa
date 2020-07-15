import React from 'react';
import * as S from './menu-item.styles';

//router
import { withRouter } from 'react-router-dom';

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  <S.MenuItem
    size={size}
    onClick={() => history.push(`${match.url}${linkUrl}`)}
  >
    <S.BackgroundImage className='background-image' imageUrl={imageUrl} />
    <S.Content className='content'>
      <S.Title>{title.toUpperCase()}</S.Title>
      <S.Subtitle>SHOP NOW</S.Subtitle>
    </S.Content>
  </S.MenuItem>
);

export default withRouter(MenuItem);
