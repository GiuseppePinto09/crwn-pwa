import { createGlobalStyle } from 'styled-components';

//(8.1) here ..
export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans Condensed';
    padding: 20px 40px;

    //(8.3) starting ding the MEDIA QUERIES ..
    //everything ((((((((BELOW)))))))) those "800px" will get added
    //((((Yihua uses "800px" for both the MOBILE and the TABLET, for Apps that, the MOBILE RESPONSIVENESS doesnt matter THAT much ..))))
    @media screen and (max-width: 800px) { 
      padding: 10px; 
    }
  }
  
  a {
    text-decoration: none;
    color: black;
  }

  * {
    box-sizing: border-box;
  }
`;
