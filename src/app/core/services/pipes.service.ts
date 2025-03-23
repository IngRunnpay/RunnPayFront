import { Injectable } from '@angular/core';
import { FormatoMoneda } from '../interface/pipes.interface';

@Injectable({
  providedIn: 'root'
})
export class PipesService {

  constructor() { }

  public formatoMoneda : FormatoMoneda = {
    currency: ''
  }

}
