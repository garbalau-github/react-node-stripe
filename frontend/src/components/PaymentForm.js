import { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#fff',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#fce883' },
      '::placeholder': { color: '#87bbfd' },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
};

const PaymentForm = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post('http://localhost:4000/payment', {
          amount: 1000, // Cents $
          id: id,
        });

        if (response.data.success) {
          console.log('Successful payment');
          setSuccess(true);
        }
      } catch (error) {
        console.log('Error:', error);
        setErrorMessage(error);
      }
    } else {
      console.log(error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      {errorMessage}
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className='FormGroup'>
            <div className='FormRow'>
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button>Pay</button>
          <br />
          <br />
          <div>
            Go with:
            <p>Card: 4242 4242 4242 4242</p>
            <p>Expiration: 04/24</p>
            <p>CSV: 292</p>
            <p>ZIP: 29872</p>
          </div>
          <div>Please, check console and network tab for fetching details!</div>
        </form>
      ) : (
        <div>
          <h2>You just bought a cookie!</h2>
        </div>
      )}
    </>
  );
};

export default PaymentForm;
