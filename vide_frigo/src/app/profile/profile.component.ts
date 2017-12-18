import { Component, OnInit } from '@angular/core';
import { User } from '../objects/User';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  private user: User;

  constructor() { }

  ngOnInit() {

console.log(localStorage.getItem('user.picture'));
    this.user = new User(
      Number(localStorage.getItem('user.id')),
  		localStorage.getItem('user.username'),
  		localStorage.getItem('user.email'),
  		localStorage.getItem('user.description'),
  		localStorage.getItem('user.picture')
    )

    $(".button-collapse").sideNav({
      menuWidth: 400,
      edge: 'right',
    });
  }

  myPage() {

  }


  editInformations() {

  }

  postedRecipes() {

  }

  favoritesRecipes() {

  }

  postedComments() {

  }

}
