import Route from '@ember/routing/route';
import fetch from 'fetch';

export default class BitcoinRoute extends Route {
  async model() {
    const response = await fetch(
      'https://api.coindesk.com/v1/bpi/currentprice.json'
    );
    const price = await response.json();
    return { price };
  }
}
