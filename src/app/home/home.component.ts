import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
cpt:number;
btn:string = "Add";
goal:string = "eau";

goals = [];

  constructor(private _data: DataService) { }

  ngOnInit() {

		this._data.goal.subscribe(res => this.goals = res);
		this.cpt = this.goals.length;
		this._data.changeGoal(this.goals);
  }

	ajouter() {
		this.goals.push(this.goal);
		this.goal = '';
		this.cpt = this.goals.length;
		//this._data.changeGoal(this.goals);
	}

}
