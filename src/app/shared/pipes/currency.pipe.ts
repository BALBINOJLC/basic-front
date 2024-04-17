import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyCLP',
  standalone: true,
})
export class CurrencyPipeCLP implements PipeTransform {
  transform(value: number): string {
    const dataLocal = { locale: 'es-CL', currency: 'CLP' };

    let amount = value === null ? 0 : value;

    amount = dataLocal.locale === 'es-CL' ? parseInt(amount.toString(), 10) : parseFloat(amount.toString());
    //alert(amount)
    const formatter = new Intl.NumberFormat(dataLocal.locale, {
      style: 'currency',
      currency: dataLocal.currency,
    });
    let amountString = formatter.format(amount);
    // menos a los 10 mil falla y por eso se agrega esto
    amountString = amountString.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return amountString;
  }
}
