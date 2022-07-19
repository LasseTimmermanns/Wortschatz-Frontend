import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleHelperService {

  constructor() { }

  calculateStepSize(x : number, steps : number, pow : number = 2) : number{
    let lastX = Math.pow(x, 1 / pow);
    return lastX / steps;
  }
}
