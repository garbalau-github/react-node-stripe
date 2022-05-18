import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const PUBLIC_KEY =
  'pk_test_51L0gMrAXDcvV4HjTElm8NsvnBH9O8E50qqxjrguk2IkZmmX9Rab0tjsV4EAUHzQnuZ8on3sxthhUx2eosR5Aly0j00Jetg6eEj';

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
};

export default StripeContainer;
