//(9.) REACT PERFORMACE, "lazy" (React FUNC (for "CODE SPLITTING")) and "Suspense" (React COMPONENT used w "lazy")
//lazy docs: "https://reactjs.org/docs/code-splitting.html#reactlazy"
//suspense docs: "https://reactjs.org/docs/code-splitting.html#suspense"
import React, {
  lazy,
  Suspense, //(9.3) importing the "Supense" COMPONENT from React
} from 'react';

//(8.) now we are doing the MOBILE RESPONSIVENESS of our APP
//to start, we are going to replace the "App.css" with a "GlobalStyle" file (which is using the "createGlobalStyle" func of "styled-components")
import { GlobalStyle } from './global.styles';
//MEDIA QUERIES
//docs: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media"
//(((((IMP)))))
//  - they have a HIGHER SPECIFICITY ORDER than regular selectors ..
//    (so no matter what styles you have, the "@media" ones, will always OVERRIDE the normal ones!!! (even the INLINE-STYLE ("<div style={..} />)")))

//router
import { Switch, Route, Redirect } from 'react-router-dom';

//redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

//components
// import HomePage from './pages/homepage/homepage.component'; //(a. ..)
// import ShopPage from './pages/shop/shop.component';
// import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
// import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';

//(10.8) using our "ErrorBoundary" COMPONENT ..
import ErrorBoundary from './components/error-boundary/error-boundary.component';

//(9.2) and RCA will take this "HomePage" (and not this: (a.)) ..
//which take the "lazy" func to import the route of that COMPONENT!
const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
//all cool, all cool ..

//(9.6) so we can do the SAME shit, for the rest of our pages ..
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SignInAndSignUpPage = lazy(() =>
  import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component')
);
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));

//but theres a (((PROBLEM))) ..
//this is SYNCHRONUS (which means that, if our server (that loads the "import") is not fast enought, the final user, might not see shit, or might get an error, bc the Component hasnt been there when we did that "getElemeById" (for ex.), bc again, this is SYNCHRONOUS)
//so it RCA will not wait for the "lazy" func to resolve, in order to display smth to the screen (and thats why we might see nothing, and error (as you most probably will get ..))

//but theres a (((SOLUTION)))
//which is ..
//using the native "Suspense" COMPONENT of React
//which its meant to be to be used with "lazy"
//and that component, makes that "lazy" import ((((ASYNCHRONUS)))))
//(so it will wait till its finished, in order to, THEN, show it)
//(see the "(9.3)")

const App = ({ checkUserSession, currentUser }) => {
  React.useEffect(() => {
    //BC WE MOVED OUR USER LOGIN LOGIC TO OUR "SAGAS"

    //(4.1)
    //since we lost that "..Change" "OBSERVABLE" firebase method, that used to check if the user is still logged or not ..
    //we gotta write a SAGA method for it ..
    //so every time, our app reloads ..
    checkUserSession(); //this method gets called
    //since its situated in the "componentDidMount()" lifecycle method of "App.js" (which is the highest component of our app)
  }, [checkUserSession]);
  //(((IMP)))
  //(10.1) passing the "checkUserSession" in the 2nd arg ARRAY ..
  //we are saying that "checkUserSession" action is firing twice .. (thats bc of the "sign in" action)
  //so here, we have to pass "checkUserSession" to that 2nd arg of "useEffect" ("[checkUserSession]")
  //but why? ..
  //bc since theres no PARENT component to this "App" component (a higher component) ..
  //are we are getting this "checkUserSession" as a prop from redux ..
  //we have to pass it to that 2nd arg ..
  //and it that way, that "useEffect" behavies exactly like a "componentDidMount"

  return (
    <div>
      {/*//(8.2) and then, importing that component (((IN THE TOP))) in our "App.js"*/}
      <GlobalStyle />
      <Header />
      <Switch>
        {/*
        //(9.1)
        //RCA will say .. "oh, you are on this path ("/"), I have to render the "HomePage" component!" 
        <Route exact path='/' component={HomePage} />
      */}
        {/*//(9.4) and using that COMPONENT where we want to (((("lazy" load a component!)))) */}
        {/*and that COMPONENT ((MUST)) have a "fallback" PROPERTY, that takes ANY COMPONENT (and which is like a "loading" property, that gets trigger when the "lazy" COMPONENT has not render yet ..)*/}
        {/*in fact, if you reload, you can see the "<div>...loading...</div>" being rendered*/}
        {/* //(9.5) 
        and j like that, you'll see that
        we PROPERLY "CHUNKED UP" and "CODE SPLIT"
        infact, 
        if you go to the "Network" tab
        you'll see that there are 3 diff ".chunk.js" files ..
          - the "main.chunk.js" (which contains ALL the rest of our APP)
          - the "0.chunk.js" (which contains the CHUNKED PART of our APP (the "HomePage" COMPONENT))
          - the "bundle.js" (which contains the LIBRARIES of that CHUNKED PART of our App)
      */}
        {/*<Suspense fallback={<div>...loading...</div>}>*/}

        {/* //(10.9) and wrapping the "Suspense" COMPONENT with our "ErrorBoundary" COMPONENT
            so if one of those "Route" (which are "lazy" loaded components ..)
            ever break ..
            the "ErrorBoundary" will pass the children to the "getDerivedStateFromError"
              and there, we are going to set the "hasErrored" state, to "true"
                and therefore, that "div" will get returned ..
                (you can acc test it out .. (j "Throw Error;" inside .. maybe the "HomePage" (I acc did that, so j look at it, and un-comment it)))
                and you'll see that "div" being rendered .. (so we dont have to show our users that ugly default error message of the browsers ..)
        */}
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path='/' component={HomePage} />
            {/*</Suspense>*/}
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route
              exact
              path='/signin'
              render={() =>
                currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />
              }
            />
            {/* 
            //(9.7) 
            the good thing about "Suspense", is that you ENCAPSULATE more than 1 component ..
            so thats why have WRAPPED all our Routes with it .. 
            
            so what will "Suspense" do is:
            it will go over ALL the "Route" COMPONENTS
            and WAIT TILL the 1st COMPONENT is finished ..
            to the next one!
            and so on ..
          */}
            {/*
            //(9.8)
            so if we go to, maybe the "ShopPage", "CheckoutPage", etc ..
            in the "Network" tab
            well'see that, theres these "0.chunk.js", "4.chunk.js", "3.chunk.js", etc ..
            that are the "CHUNKS" that React has SPLITTED UP (the numbers are the number of chunks that have been SPLITTED UP .. (THEY ARE NOT RANDOM))
              so, j like that, we know that the "Suspense" and "lazy" loading feature is (((WORKING CORRECTLY!!!!)))
              (and therefore the "CODE SPLITTING" feature too)
            and
              that our APPLICATION a little bit FASTER now! (bc we are DYNAMICALLY IMPORTING OUR "Route"s)
              BUT, since this APP is NOT THAT LARGE, you are not going to see that much of a improvement
                but in a LARGER APP, you'll DEFINITELY SEE an IMPROVEMENT
                (and since its so easy to write, theres no reason to not do so .. so gg j go write some "lazy"/"suspense" code)
          */}
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

//SWITCH & ROUTE shit
// {/* <Switch> {/* SWITCH ALLOWS US TO FOLLOW A PATTERN IN WHICH AS A LONG AS A PATH IS THE SAME THE REST AFTER IT IS LIKE A CHILD OF THAT PARENT */}
//   <Route exact path='/' component={HomePage} /> {/* if we dont put exact then every path with a '/' will be render in the HomePage component, but if we put in the exact then is we exactly put / or without it then then it will targets just the HomePage */}
//   <Route path='/shop/hats' component={Prova} /> {/* exact= it has to be exactly that and it accept true or false(without exact is false) path= we pass a string that will be our url component= any component we want */}
// </Switch> {/* switch says that HomePage will be render first then it will not render nothing after it, so the moment Switch sees somethign MATCH the path then it just render that route */}
