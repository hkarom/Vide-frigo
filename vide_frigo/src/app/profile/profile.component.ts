import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../objects/User';
declare var jquery: any;
declare var $: any;

const urlrecipesposted = 'http://localhost:3000/api/recipesposted'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private user: User;


  constructor(  private router: Router) { }

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
  //this.router.navigate(['/favorites']);
  }

  postedComments() {

  }

}
