export default function (context, inject) {
    if (typeof window !== 'undefined') {
      const stripePlugin = {
        import() {
          return window['Stripe'] && window['Stripe']('pk_test_yBVcFyDWFZeqbpVo6fKuLzUf');
        },
      };

      inject('stripe', stripePlugin);
      context.app.stripe = stripePlugin;
    }
}
