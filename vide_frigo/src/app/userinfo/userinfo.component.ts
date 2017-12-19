import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../objects/User';
declare var jquery: any;
declare var $: any;
const MAX_STARS = 5;

const userUrl = 'http://localhost:3000/user/';
const favoritesUrl = 'http://localhost:3000/favorites/';
const recipeUrl = 'http://localhost:3000/recipes/';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  private user: User;
  public favoriteList = [];
  public recipeList = [];
  private section = 1;

  constructor(
    private http: HttpClient,
    private el: ElementRef,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.forEach(params => {
      let userName = params.name;
      this.http.get<User>(userUrl + userName).map((response: any) => {
        if (response) {
          this.user = response;
        }
      });
    })

   }

  ngOnInit() {
    $(document).ready(function() {
      $('select').material_select();
    });

    window.onscroll = function() { myFunction() };
    var navbar = document.getElementById("navbarFixed");
    var sticky = navbar.offsetTop;
    function myFunction() {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("navbar-fixed")
      } else {
        navbar.classList.remove("navbar-fixed");
      }
    }
  }

  laodFavorites() {
    this.http.get(favoritesUrl + this.user.name).map((response: any) => {
      if (response) {
        this.favoriteList = response;
      }
    });
  }

  loadPostedRecipes() {
    this.http.get(recipeUrl + this.user.name).map((response: any) => {
      if (response) {
        this.recipeList = response;
      }
    });
  }

  displayStar(number) {
    let stars = "";
    for (let i = 0; i < MAX_STARS; i++) {
      if (i < number) stars += '★';
      else stars += '☆';
    }
    return stars;
  }


  calculMark(e_mark, nb_vote) {
    return Math.round(e_mark / nb_vote);
  }

}
