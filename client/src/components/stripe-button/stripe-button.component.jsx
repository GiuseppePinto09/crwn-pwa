import React from 'react';

//stripe
import StripeCheckout from 'react-stripe-checkout';

//axios
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100; //Stripe want the price in cents (so we gotta convert it by j multiplying it by 100)
  const publishableKey = //we need this publishable key in order to use the Stripe components
    'pk_test_51H0DYyEmcau7vKuAg9oQHxb6CJtSN1oXJPjGXBLiigJQCvvFQMO8Qopqsyr0sxbutgzQd86Yxv7KnMBTASXsGhbj00XNwAmBYt';

  const onToken = token => {
    //that method gets the "token" as a param
    // console.log(token); //so we should acc make an API call where we pass the token, and the backend process the payment
    axios({
      //((("axios" RETURNS A PROMISE!)))
      url: 'payment', //axios is gonna use our CURRENT URL, and then is gonna APPEND that "payment" (which is the same "route" of our WEB SERVER) url to our CURRENT URL!
      method: 'POST', //to let axios know that is a "POST"
      data: {
        //then the "data" is the DATA WE SENT TO OUR WEB APP
        //(((((the key names have to be the same as our WEB APP's!)))))
        amount: priceForStripe, //but it this case we are (((ONLY))) SETTING the "amount" key!
        token, //we pass the "token" PARAMETER
        //so it match any other keys, etc .. that STRIPE NEEDS
        //(you can thing of it as a "...token" type of feature!)
      },
    })
      //success case
      .then(response => {
        alert('Payment successful!');
      })
      //error case (we want to ".catch()" it!)
      .catch(error => {
        console.log('Payment error: ', error); //since the "error" we get is JSON, we have to parse it to an OBJECT (w "JSON.parse()")!
        alert(
          'Theres was an issue with your payment. Please sure you use the provided credit card!'
        );
      });
  };

  return (
    //(this component acc have a lot of props .. so its better if you look for the documentation ..
    //here: "https://github.com/azmenak/react-stripe-checkout")
    //and the good thing about "Stripe" is that it adds for us, VALIDATION OF EMAILS, PASSWORD, ETC, ETC .. so its a really, really good service!
    <StripeCheckout
      label='Pay now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='http://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`} //"price" bc we want the user to see the DOLAR price (and not the converted price for Stripe)
      amount={priceForStripe} //amount in cents (for Stripe, bc he wants it like that)
      panelLabel='Pay now'
      token={onToken} //on success callback (the submit is handle by the "StripeCheckout" component)
      stripeKey={publishableKey} //the publishable key of your acc so you can use this component
    />
  );
};

export default StripeCheckoutButton;
