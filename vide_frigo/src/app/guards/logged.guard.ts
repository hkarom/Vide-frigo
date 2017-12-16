import { Injectable } from '@angular/core';
import { Router, CanActivate, CanDeactivate } from '@angular/router';

@Injectable()
export class LoggedGuard implements CanActivate{

    constructor(private router: Router) { }

    canActivate() {
      console.log(localStorage.getItem('user.token'));
        if (!localStorage.getItem('user.token')) {
            // not logged in so return true
            return true;
        }

        //  logged in so redirect to home page
        this.router.navigate([''])
          .catch(reason => console.log(reason));
        return false;
    }

}
