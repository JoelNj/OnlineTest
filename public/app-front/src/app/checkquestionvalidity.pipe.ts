import { Pipe, PipeTransform } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Pipe({
  name: 'checkquestionvalidity'
})
export class CheckquestionvalidityPipe implements PipeTransform {

  constructor(private cookieService: CookieService) { }
  transform(value: unknown, ...args: unknown[]): unknown {
    const valueToCheckInMyCookie = 'ans' + value;
    const cookieExists = this.cookieService.check(valueToCheckInMyCookie);

    if (cookieExists) {
      const checkMyCookieValue = this.cookieService.get(valueToCheckInMyCookie);
      if (checkMyCookieValue == "true") {
        return true;
      }
      else {
        return false
      }
    }
    else {
      return false
    }
  }
}
