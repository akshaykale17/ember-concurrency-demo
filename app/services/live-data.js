import Service from '@ember/service';
import fetch from 'fetch';

export default class LiveDataService extends Service {
  async getliveData() {
    const response = await fetch(
      'https://api.coindesk.com/v1/bpi/currentprice.json'
    );
    const price = await response.json();
    return { price };
  }
}
