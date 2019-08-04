import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {NbAuthService} from '@nebular/auth';
import {tap} from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private  authService: NbAuthService, private route: Router) {
  }
  canActivate() {
    // return false;
    this.authService.logout('email');
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          console.info(authenticated);
          if (!authenticated) {
            this.route.navigate(['/auth/login']);
          }
        }),
      );
  }
}
