import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../objects/Recipe';
declare var jquery: any;
declare var $: any;
const MAX_STARS = 5;

const recipesUrl = 'http://localhost:3000/recipes/';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  private types = [['Starter', true], ['Dish', true], ['Dessert', true]];
  private starsType = [['Very low', 1, 'verylow'], ['Low', 2, 'low'], ['Medium', 3, 'medium'], ['High', 4, 'high'], ['Very high', 5, 'veryhigh']];
  private searchForcus = false;
  private ingredientsList = [];
  private mark = -1;
  private cookingTime = '00:00';
  private preparationTime = '00:00';
  public recipeList = [];


  constructor(
    private http: HttpClient,
    private el: ElementRef,
    private route: ActivatedRoute,
    private router: Router
  ) {
    let r1 = new Recipe(-1, -1, 'Tarte aux fraises', '', '30:00', '45:00', 'Some steps', 'DESSERT', 10, 2);
    let r2 = new Recipe(-1, -1, 'Tarte aux fraises', '', '30:00', '45:00', 'Some steps', 'DESSERT', 10, 2);
    let r3 = new Recipe(-1, -1, 'Tarte aux fraises', '', '30:00', '45:00', 'Some steps', 'DESSERT', 10, 2);
    let r4 = new Recipe(-1, -1, 'Tarte aux fraises', '', '30:00', '45:00', 'Some steps', 'DESSERT', 10, 2);
    let r5 = new Recipe(-1, -1, 'Tarte aux fraises', '', '30:00', '45:00', 'Some steps', 'DESSERT', 10, 2);
    let r6 = new Recipe(-1, -1, 'Tarte aux fraises', '', '30:00', '45:00', 'Some steps', 'DESSERT', 10, 2);
    let r7 = new Recipe(-1, -1, 'Tarte aux fraises', '', '30:00', '45:00', 'Some steps', 'DESSERT', 10, 2);

    this.recipeList.push(r1, r2, r3, r4, r5, r6, r7);
  }

  ngOnInit() {
      this.route.queryParams.forEach(params => {
        this.ingredientsList = params.ingredients;
        this.cookingTime = params.cTime.replace(/m/g,':');
        this.preparationTime = params.pTime.replace(/m/g,':');
        this.mark = params.mark;
        this.types = params.types;
      });
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

  displayStar(number) {
    let stars = "";
    for(let i = 0; i < MAX_STARS; i++) {
      if(i < number) stars += '★';
      else stars += '☆';
    }
    return stars;
  }


  calculMark(e_mark, nb_vote) {
    return Math.round(e_mark/nb_vote);
  }

  loadRecipe(recipe) {
    let params = new HttpParams();
    //params = params.append('val', val);
    this.http.get<Recipe[]>(recipesUrl, {params: params}).map((response: any) => {
      if (response) {
        this.recipeList = response;
      }
    });
  }

  adapt(name) {
    return name.replace(/ /g, '-');
  }

}
