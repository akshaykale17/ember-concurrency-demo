import Service from '@ember/service';

export default class LiveService extends Service {
  async getliveData() {
    const response = await fetch(
      'https://api.coindesk.com/v1/bpi/currentprice.json'
    );
    const price = await response.json();
    return { price };
  }
}
