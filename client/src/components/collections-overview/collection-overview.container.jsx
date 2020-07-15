//redux
import { connect } from 'react-redux';
import { compose } from 'redux'; //(6. ..)
import { createStructuredSelector } from 'reselect';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';

//components
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
});

const CollectionsOverviewContainer = compose(
  //4th
  connect(mapStateToProps), //3rd
  WithSpinner //2nd
)(CollectionsOverview); //1st

export default CollectionsOverviewContainer;
