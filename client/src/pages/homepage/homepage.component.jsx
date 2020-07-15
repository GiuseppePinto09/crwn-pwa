import React, { Profiler /* //(13.1) importing it out */ } from 'react';
import * as S from './homepage.styles';

//components
import Directory from '../../components/directory/directory.component';

//(13.)
//React <Profiler>
//((DEF)) -> its a component, that allow us to have information, about a certain WRAPPED component that we are looking to test ..
//(only available on React v.16.10+)
//docs: "https://reactjs.org/docs/profiler.html#usage"
/* 
  (((HOW TO UPDATE REACT))) (on existing project (when creating a new one, you'll have the LATEST version AUTOMATICALLY))
  1. "yarn list react" (to see the version of React you currently have) 
  2. *manually change the "react" version to the latest on the "package.json", and them, run "yarn" (or "npm install")     
*/

const HomePage = () => {
  // throw Error;
  return (
    <S.HomePage>
      {/*
      //(13.2) using it (wrapping the component, that we want to see some information)
    */}
      <Profiler
        id='Directory' //"id", used to identify this "Profiler" (since we might be using more than 1 in our App ..)
        onRender={(id, phase, actualDuration) => {
          //"onRender" accepts a CALLBACK func, that accepts multipe props
          //((((((((WE CANNOT DESTRUCTURE THEM, so we gotta write the CORRECT ORDER of the props))))))))
          //(but these 3 are the main ones, you could say ..)

          //((((((((IMP))))))))
          //LOOK AT THE "docs" FOR MORE "props" YOU CAN USE!! (its really interesting (io))

          console.log({
            id, //the identifier of this "Profiler" in particular
            phase, //"mount" or "update"
            actualDuration, //integer, that represents the time it took to "mount" or "update" (expressed in MILLISECONDS!)
          });
        }}
      >
        <Directory />
      </Profiler>
    </S.HomePage>
  );
};

export default HomePage;
