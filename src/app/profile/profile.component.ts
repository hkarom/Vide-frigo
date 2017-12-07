import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  nom: string
  prenom: string
  age: number
  level: string

  constructor() { }

  ngOnInit() {
    this.nom = "Smith";
    this.prenom = "Jean";
    this.age = 45;
    this.level = "Expert";
  }

}
