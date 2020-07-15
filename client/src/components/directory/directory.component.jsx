import React from 'react';
import * as S from './directory.styles';

//redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDirectorySections } from '../../redux/directory/directory.selectors';

//components
import MenuItem from '../menu-item/menu-item.component';

const Directory = ({ sections }) => (
  <S.Directory>
    {sections.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </S.Directory>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});

export default connect(mapStateToProps)(Directory);
