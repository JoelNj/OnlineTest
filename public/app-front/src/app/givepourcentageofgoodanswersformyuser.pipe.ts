import { Pipe, PipeTransform } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Pipe({
  name: 'givepourcentageofgoodanswersformyuser'
})
export class GivepourcentageofgoodanswersformyuserPipe implements PipeTransform {
  count!: number;
  countNumberOfTrueAnswer!: Number
  constructor(private cookieService: CookieService) {

  }

  transform(value: unknown, ...args: unknown[]): unknown {

    const allCookies = this.cookieService.getAll();

    
   

    this.count = 10;
    value = "you have "
    return value + " " + this.count + "%";

  }

}


