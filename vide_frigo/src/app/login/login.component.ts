import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	goals: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
this.route.params.subscribe(res => console.log(res.id));
	 }

  ngOnInit() {

  }

	sendMeHome() {
		this.router.navigate(['']);
	}

}
