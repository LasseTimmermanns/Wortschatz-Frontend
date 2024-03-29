import { Injectable } from '@angular/core';

//https://readerstacks.com/how-to-set-and-get-cookies-in-angular/
@Injectable()
export class CookieService {
  constructor() {}

  public getToken(){
    let time : number = new Date().getTime();
    let exp : number = +this.getCookie("sessionExp");
    if(exp > time) return this.getCookie("sessionToken");

    console.log("Token expired");
    return;
  }

  public getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }

  public deleteCookie(cookieName : string) {
    this.setCookie({ name: cookieName, value: '', expireHours: -1 });
  }

  /**
   * Expires default 1 hour
   * If params.session is set and true expires is not added
   * If params.path is not set or value is not greater than 0 its default value will be root "/"
   * Secure flag can be activated only with https implemented
   * Examples of usage:
   * {service instance}.setCookie({name:'token',value:'abcd12345', session:true }); <- This cookie will not expire
   * {service instance}.setCookie({name:'userName',value:'John Doe', secure:true }); <- If page is not https then secure will not apply
   * {service instance}.setCookie({name:'niceCar', value:'red', expireHours:10 }); <- For all this examples if path is not provided default will be root
   */
  public setCookie(params: any) {
    let d: Date = new Date();
    d.setTime(
      d.getTime() +
      (params.expireHours ? params.expireHours : 1) * 60 * 60 * 1000
    );
    document.cookie =
      (params.name ? params.name : '') +
      '=' +
      (params.value ? params.value : '') +
      ';' +
      (params.session && params.session == true
        ? ''
        : 'expires=' + d.toUTCString() + ';') +
      'path=' +
      (params.path && params.path.length > 0 ? params.path : '/') +
      ';' +
      (location.protocol === 'https:' && params.secure && params.secure == true
        ? 'secure'
        : '');
  }
}
