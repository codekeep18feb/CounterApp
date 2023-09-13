import React from "react";
import { connect } from "react-redux";
import { setCurrentCounter } from "../redux/counter/counter-action";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CounterComponent from "../component/counter-component";
import { createStructuredSelector } from "reselect";
import { selectCurrentCounter } from "../redux/counter/counter-selector";
import UseStyles from "./counter-screen-design";
import { Elements } from '@stripe/react-stripe-js'; // Import Elements
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe outside the component
const stripePromise = loadStripe('pk_test_QlDA5SL28jaVLd22eF39ymGA00VLnj8ebN');

const CounterScreen = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      // Handle error
      console.log('error')
    } else {
      // Send the token to your server
      // You can use Axios or another library to make a POST request to your Flask server.
      console.log('token',token)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit">Pay</button>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentCounter: (counter) => dispatch(setCurrentCounter(counter)),
});

const mapStateToProps = createStructuredSelector({
  currentCounter: selectCurrentCounter,
});

// Wrap your component with the Elements provider
const WrappedCounterScreen = () => (
  <Elements stripe={stripePromise}>
    <CounterScreen />
  </Elements>
);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedCounterScreen);
