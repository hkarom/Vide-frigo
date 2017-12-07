import { Injectable, Inject } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class DataService {

	http: any;

	private goals = new BehaviorSubject<any>(["oignon", "tomate"]);
	goal = this.goals.asObservable();

  constructor(@Inject(Http) http) {
		this.http = http;
	 }

changeGoal(goal) {
	console.log("YO");
	//this.goals.next(goal);
	this.http.get('http://localhost:3000/tables').subscribe(data => {
		console.log(data);
	});
}

display() {
	console.log("DISPLAYING");
}
}
