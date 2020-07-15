import React, { lazy, Suspense } from 'react';

//redux
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

//route
import { Route } from 'react-router-dom';

//components
// import CollectionsOverviewContainer from '../../components/collections-overview/collection-overview.container';
// import CollectionPageContainer from '../collection/collection.container';
import Spinner from '../../components/spinner/spinner.component';

const CollectionsOverviewContainer = lazy(() =>
  import('../../components/collections-overview/collection-overview.container')
);
const CollectionPageContainer = lazy(() =>
  import('../collection/collection.container')
);

const ShopPage = ({ match, fetchCollectionsStart }) => {
  React.useEffect(() => {
    fetchCollectionsStart();
    //with "[]" we are firing this action again ..
    //why?
    //bc we fire that action going to that "/shop/hats" (for ex.)
    //--> goes to the "App.js"
    //--> that has that a "Route" with that "Shop" component
    //--> once in the "Shop" component, we "render" again, that then fires that "useEffect" again ..
    //and thats how we ended up with firing that action TWICE!
    //but can we solve that?
    //by j passing "fetchCollectionsStart" (the action itself) to that 2nd arg!!
    //(continue below ..)
  }, [fetchCollectionsStart]);
  //(10.2) but why we are passing that?
  //simply .. to avoid that React warning on the console ..
  //(bc, as you learned, to mimic the "componentDidMount" you j have to pass an empty array .. ("[]"))
  //((EXPLANATION)):
  //"useEffect" sees that, that "fetchCollectionsStart" is coming in AS A PROP
  //so it doesnt know that it will not change
  //it doesnt know that that action is coming from our redux
  //so since its a prop (and therefore can change .. (io, io, extra iooooo (non farci caso xD)))
  //then it wants us to put it in the 2nd arg array "[]"

  //just to be sure that we are only firing the "fetchCollectionsStart()" "method" (he doesnt know that its an action)
  //ONLY when we are updating that "fetchCollectionsStart" method! ..

  //so in this way ..
  //we are not firing that action twice (like we did before ..)

  return (
    //(9.9) im doing this ones (they give me this one as an exercise ..)
    //(but continue with see the "(10.)" for more of REACT PERFORMANCE!)
    <div>
      <Suspense fallback={<Spinner />}>
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </Suspense>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
