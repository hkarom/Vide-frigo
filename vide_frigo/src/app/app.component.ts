import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Vide frigo';

  constructor(
    private router: Router,
    private auth: AuthService
  ) {
    router.events.subscribe((event: Event) => {
      router.events
        .filter(event => event instanceof NavigationError)
        .subscribe((event: Event) => {
          this.router.navigate([''])
            .catch(reason => console.log('Bad direction'));
        });
    })
  }

  ngOnInit() {

  }

  userName() {
    return localStorage.getItem('user.username');
  }

  logout() {
    this.auth.logout()
      .subscribe(result => {
          console.log(result);
        if (result) {

          this.router.navigate([''])
            .then(value => console.log('redirect: ', value))
            .catch(reason => console.log('redirect: ', reason));
        } else {
          console.log('Error : could not log out');
        }
      }, err => {
        console.log(err);
      });
  }


}
