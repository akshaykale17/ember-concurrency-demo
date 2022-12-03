import Component from '@glimmer/component';
// import { service } from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';
import { action } from '@ember/object';

export default class BaseComponent extends Component {
  constructor(owner, args) {
    super(owner, args);
    console.log('A');
    this.waitAFewSeconds.perform();
  }
  get data() {
    return this.args.price;
  }

  delay = (ms) => new Promise((res) => setTimeout(res, ms));

  @tracked serviceDate;
  @tracked serviceUSD;
  @tracked serviceGBP;
  @tracked serviceEUR;
  @tracked changeUSD = 0;
  @tracked changeGBP = 0;
  @tracked changeEUR = 0;

  get isUSDPositive() {
    return this.changeUSD > 0;
  }
  get isGBPPositive() {
    return this.changeUSD > 0;
  }
  get isEURPositive() {
    return this.changeUSD > 0;
  }

  waitAFewSeconds = task(async () => {
    while (true) {
      const response = await fetch(
        'https://api.coindesk.com/v1/bpi/currentprice.json'
      );
      const price = await response.json();
      console.log(price);
      this.serviceDate = price.time.updated;
      this.serviceUSD = price.bpi.USD.rate;
      this.serviceGBP = price.bpi.GBP.rate;
      this.serviceEUR = price.bpi.EUR.rate;
      this.changeEUR =
        parseInt(this.serviceEUR.replace(',', ''), 10) -
        parseInt(this.data.bpi.EUR.rate.replace(',', ''));
      this.changeUSD =
        parseInt(this.serviceUSD.replace(',', ''), 10) -
        parseInt(this.data.bpi.USD.rate.replace(',', ''));
      this.changeGBP =
        parseInt(this.serviceGBP.replace(',', ''), 10) -
        parseInt(this.data.bpi.GBP.rate.replace(',', ''));
      await this.delay(60000);
    }
  });

  @action
  cancel() {
    this.waitAFewSeconds.cancelAll();
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.waitAFewSeconds.cancelAll();
  }
}
