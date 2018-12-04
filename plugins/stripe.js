import Vue from 'vue'; // eslint-disable-line import/no-extraneous-dependencies
import VueStripeCheckout from 'vue-stripe-checkout';

const { STRIPE_TOKEN } = process.env;
const options = {
  key: STRIPE_TOKEN,
  locale: 'auto',
  currency: 'USD',
};

if (STRIPE_TOKEN) Vue.use(VueStripeCheckout, options);
