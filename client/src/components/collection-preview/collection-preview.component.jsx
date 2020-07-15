import React from 'react';
import * as S from './collection-preview.styles';

//route
import { withRouter } from 'react-router-dom';

//components
import CollectionItem from '../collection-item/collection-item.component';

const CollectionPreview = ({ title, items, history, match, routeName }) => (
  <S.CollectionPreview>
    <S.Title onClick={() => history.push(`${match.path}/${routeName}`)}>
      {title.toUpperCase()}
    </S.Title>
    <S.Preview>
      {items
        //here smth to keep in mind is that, you could create a selector that DECIDES whether to render 4 items or not, but this is up to you, for ex. in this case its good deciding it in here, in the components, plus bc if we have to make a slider of 8 items we could do it here so its ok, but i say this, bc YOU GOTTA THINK OF THESE THING IN ORDER TO BE A BETTER DEV, you gotta think if having it in here its ok or you gotta make a new selector and shit like that ..
        .filter((item, idx) => idx < 4) //filter the index to render just 4 items
        .map((
          item //the key={id} (passing the id in) is obligatory
        ) => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </S.Preview>
  </S.CollectionPreview>
);

export default withRouter(CollectionPreview);
