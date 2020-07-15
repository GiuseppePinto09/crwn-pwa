import React from 'react';
//(10.10)
import * as S from './error-boundary.styles';

//(10.)
//REACT PERFORMACE: "Error boundaries" (contenitori di errore)
//((DEF)) -> simple class component, that its converted to an "Error Boundary" component, bc we use the "getDerivedStateFromError" and "componentDidCatch" LIFECYCLE METHODS ..
//docs: "https://reactjs.org/docs/error-boundaries.html"
//404 images: "https://www.kapwing.com/404-illustrations?ref=producthunt"

//the thing abt the "Suspense" and "lazy" is that
//we are now leveraging some functionality on the BACKEND of React (because we are using "Suspense" and that, returns us a script that generates the page, that we have "lazy" loaded (io))
//so bc of this, we know depend on INTERNET (we acc did before too, but not that much .. (io))

//so if an error occurs JUST when we are LOADING that "lazy" COMPONENT
//((for ex.) the user losses internet connection ..)
//the user will j see the "Spinner" COMPONENT, over and over again .. and it wont finish (bc we have lost internet connection (for ex.))

//.. but we dont want that
//we want to make the user see a CUSTOM COMPONENT, instead of that weird ass default error page of the browsers ..
//and we can do that with "ErrorBoundary" components

class ErrorBoundary extends React.Component {
  //(10.1) they are j COMPONENTS (THAT WE MAKE)
  //but in order to make React UNDERSTAND that we are making an "ErrorBoundary" component ..
  //THEY MUST:
  //  - be ((a CLASS COMPONENT))
  //  - have at least 1 of these 2 LIFECYCLE METHODS ..
  //  "getDerivedStateFromError"
  // and
  //  ""

  //(10.4)
  constructor() {
    super();

    this.state = {
      hasErrored: false, //let us know if any CHILDREN has thrown an error ..
    };
  }

  //(10.2)
  //the 1st method .. ((((the MOST IMPORTANT of the 2))))
  //(((DEF))) -> CATCHES any of error that GETS THROWN in any of the CHILDREN of this "ErrorBoundary"
  //and pass it to this "getDerivedStateFromError" method as a prop (in this case, that prop is called "error")
  static getDerivedStateFromError(error) {
    //so here, we can process the error somehow

    //but one ((MANDATORY)) thing we HAVE to do
    //is to "return" from this method, an OBJ that SET the STATE somehow ..
    //(10.3) and since its a class component, we have access to the "constructor" and other shits (see the "(10.4)")
    return {
      hasErrored: true, //setting the "hasErrored" to "true"
    };
  }

  //(10.5) so now the COMPONENT knows if an error has ocurred or not! ..

  //(10.6)
  //the 2nd method ..
  //(((DEF))) --> gives us the "error" and the "info" (might be, which COMPONENT acc through the error (which COMPONENT acc BROKE ..))
  componentDidCatch(error, info) {
    //here, you might j want to log it out ..
    //or send some info somewhere, etc, etc ..
    console.log(error);
  }

  //(10.7) but the most IMPORTANT one, is the "getDerivedStateFromError"
  //bc we want to "render" diff UIs for diff erros .. yk
  render() {
    if (this.state.hasErrored) {
      //if "hasErrored" is "true"
      // return <div> Something went wrong </div>; //then, render this shit ..

      //(10.10)
      //but ofc, you can "return" a (custom) COMPONENT that will look a bit more professional!
      return (
        <S.ErrorImageOverlay>
          <S.ErrorImageContainer imageUrl='https://i.imgur.com/yW2W9SC.png' />
          <S.ErrorImageText>Sorry this page is broken</S.ErrorImageText>
        </S.ErrorImageOverlay>
      );
    }

    return this.props.children; //otherwise then j render the CHILDREN normally (the "children" prop, OFC) ..
    //as they always will ..
  }
}

export default ErrorBoundary;
