//"require" is an old way of using ES6 "import"s (to import libraries from your dependencies)
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

//(12.) using the "compression" library for "Gzip"ping
const compression = require('compression');

//(14.4) making the "HTTPS" features
//(so we want to make that, if anybody makes a request on HTTP .. we want to redirect them over to HTTPS)
//and in order to do that, we are using the "express-sslify" LIBRARY (Yihua thing is the best one out there ..)
//docs: "https://www.npmjs.com/package/express-sslify"
const enforce = require('express-sslify');

//so we can ONLY use the "dotenv" (so we can use the ".env"* files ..) library .. in DEVELOPMENT MODE ONLY!
//*".env" is only a file that we can use to hide things from the WEB SERVER (only on the BACKEND, bc you CANT hide anything in the FRONTEND)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); //(1.) //with this code, we are: TAKING EVERY ".env" FILE and ADDING IT TO THE "process.env"
}

//STRIPE LIBRARY
//(1.1) //(doing it here, and not in the top (which the other "imports"), bc we need the ".env" file we have after the "if")
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
//since the 'stripe' library gives us a function (the "stripe" function)
//and that function has takes an argument .. (takes your acc's secret key (that we have in the ".env" file, which is accessible in the "process.env", thanks to that code in the "(1.)"))
//we can DIRECTLY PASS IT in the "import" itself
//and we do that in the using the other "()" after the "require('stripe')"

//so we can use "express" framework
const app = express();
const port = process.env.PORT || 5000; //so our WEB SERVER runs on a diff port that our React application (which is 3000)

//(12.1)
//we j call it, (thats it .. xDDDDDD)
app.use(compression());

//(using the "bodyParser" library)
app.use(bodyParser.json()); //here we are saying: "any of the request that are coming in, transform the BODY! (thats y its called "bodyParser") in JSON!"
app.use(bodyParser.urlencoded({ extended: true })); //"urlencoded" is a way to make sure that ALL THE URLS that are COMING IN or WE ARE PASSING are WELL FORMATED as an URL STRING! (so they dont get strange letters, symbols, whitespaces, etc .. (or if they have such things, they get properly escaped!))

//(using the "cors" library)
/*
  EXPLAINING "CORS":
    "origin" 
      means that (for ex.) you see that our WEB SERVER is being host on "localhost:5000"
        but our WEB APPLICATION (React) is being host on "localhost:3000"
        which is a DIFFERENT PORT ("ORIGIN")
          so when our FRONTEND (3000) makes a REQUEST to our BACKEND (5000)
            what "cors()" does (and most web server by default)
              is to CHECK IF THE ORIGIN IS THE SAME
              IF ITS NOT THE SAME, then it denieds the request ..
              (which is a "safety feature" you could say)
(continue below ..)
*/
app.use(cors()); //so using "cors()" ENABLES that feature so the port "3000" can make request to the "5000"

//if we are in PRODUCTION now ..
if (process.env.NODE_ENV === 'production') {
  //(14.5) using the "enforce" library
  //(thats it, then push onto Heroku and look at it, its acc PRETTY COOL!)
  app.use(
    enforce.HTTPS({
      trustProtoHeader: true, //we used this "trustProtoHeader", since HEROKU and other hosters often use "REVERSE PROXIES", which is a way to forward UNENCRYPTED HTTP TRAFFIC to the website
      //which make it difficult to detect it the original request WAS IN HTTPS or not ..
      //thats why we need this "trustProtoHeader"
    })
  );

  app.use(
    //"static" is a middleware function of the "express" library
    express.static(
      //and this function takes all of our static files (io)
      path //(using the "path" library)
        .join(
          __dirname, //"__dirname" is part of Node.js,
          'client/build' //"client/build" is the "client" folder (that holds our RCA) and "/build" is the folder we have when our application gets build (so its the folder where our WHOLE app is situated)!
        )
    )
  );

  app.get(
    //".get()" is a function that represents the "GET" request type (then, there are "POST", "UPDATE", "DELETE", etc ..)
    '*', //"'*'" so, we are saying: "for EVERY URL that the user hits"
    //we pass this function ..
    function (request, response) {
      //"request" is the acc REQUEST that we are getting, "response" is the acc RESPONSE we are gonna send back
      response.sendFile(
        //when the user request smth we want to send (response) our static files
        path.join(
          __dirname, //"__dirname" is part of Node.js,
          'client/build', //"client/build" is the "client" folder (that holds our RCA) and "/build" is the folder we have when our application gets build (so its the folder where our WHOLE app is situated)!
          'index.html' //"index.html", so we are gonna give the WEB SERVER the "index.html", which holds ALL of our code!
        )
      );
    }
  );
}

//we "listen", so that method allows us to run the code we write before, and handle some errors if there are some ..
app.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});

//STRIPE BACKEND ("/payment" route)
//docs: "https://www.npmjs.com/package/stripe"
app.post(
  //"app.post()" allows us to create a POST request!
  '/payment', //this is the ROUTE
  (request, response) => {
    //the ".post()" method of "app" (of EXPRESS) takes a FUNCTION, which gets a "request" and a "response" of the API call

    //creating a "body" object, since STRIPE wants it in its "create()" method!
    const body = {
      //"request" gets an obj (which is the object we pass on our FRONTEND)
      source: request.body.token.id, //and using it, we pass the "id"
      amount: request.body.amount, //the amount
      currency: 'usd', //and the currency, which is a string, that you can see what type of currencies STRIPE HAS AVAILABLE!
    };

    //using the ".create()" method of the "stripe" func
    stripe.charges.create(
      body, //that wants the body obj we created
      (stripeError, stripeResponse) => {
        //and a FUNCTION, similar to our ".post()" func
        //(BECAUSE SINCE THIS IS ANOTHER API CALL, IT CAN FAIL OR SUCCESSED TOO!)
        if (stripeError) {
          //so if theres an error
          response.status(500).send({ error: stripeError }); //put the "status" to "500" ("internal server error") and send a (custom) obj, when the "error" prop gets the "stripeError" param of the ".create()" method
        } else {
          //if it successed
          response.status(200).send({ sucess: stripeResponse }); //we put the "status" to "200" ("OK" (the success code)) and send a (custom) obj, when the "success" prop gets the "stripeSuccess" param of the ".create()" method
        }
      }
    );
    //(then, "stripe" returns us back an OBJECT, which is the obj we need in order to make the charge)
  }
);

//(14.2) since we are using an EXPRESS server ..
//we need to send the "serviceWorker.js" from the "build" of our APP ..
app.get(
  '/serviceWorker.js', //has to be the EXACT name of the file (and NODE knows that is file, since we have ".js" at the end (io))
  (request, response) => {
    //which passes a func
    response.sendFile(
      path //"path" is a library we imported
        //and we call the ".resolve()" method on it
        .resolve(
          __dirname, //and say that, we have the directory name
          '..', //which is ABOVE 1 folder (you could say), (thats why there are this ".." (which is the same shit you do when importing thing on React))
          'build', //is situated on the "build" folder
          'service-worker.js' //and the file is called "service-worker.js"
        )
    );
  }
);
