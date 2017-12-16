import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginForm: FormGroup;
  goals: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    const password = new FormControl(null, [Validators.required, Validators.minLength(8)]);
    this.loginForm = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(2)]],
      password: password,
      withCredentials: true,
      credentials: 'include'
    });
  }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.loginForm.value)
      .subscribe(result => {
        if (result) {
          console.log(result);
          this.router.navigate([''])
            .then(value => console.log('redirect: ', value))
            .catch(reason => console.log('redirect: ', reason));
        } else {
          console.log('Error : username or password incorrect');
        }
      }, err => {
        console.log(err);
      });
  }

  sendMeHome() {
    this.router.navigate(['']);
  }

}
