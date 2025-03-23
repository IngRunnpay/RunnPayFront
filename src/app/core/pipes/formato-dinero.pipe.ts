import { Pipe, PipeTransform } from '@angular/core';
import { PipesService } from '../services/pipes.service';

@Pipe({
  name: 'formatoDinero',
  standalone: true
})
export class FormatoDineroPipe implements PipeTransform {

  constructor(private pipesServices: PipesService){}

  transform(value?: string, tipo: string = ''): unknown {
    var aux = value?.toString()
    aux = aux?.replace(/\./g, '');
    aux = aux?.replace(/\s/g, '');
    aux = aux?.replace(/\$/g, '');
    aux = aux?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    if(aux != null){
      if (aux?.length > 1) aux = aux?.replace(/^0+/, '');
      if (aux === '' || tipo === '') {
        return aux;
      } else if (tipo == '1') {
        this.pipesServices.formatoMoneda.currency = tipo;
        return tipo = '$' + aux + ' COP';
      } else if (tipo == '2') {
        this.pipesServices.formatoMoneda.currency = tipo;
        return tipo = '$' + aux + ' USD';
      } else if (tipo == '3') {
        this.pipesServices.formatoMoneda.currency = tipo;
        return tipo = '$' + aux + ' EUR';
      }
    }
    return aux;
  }
}
