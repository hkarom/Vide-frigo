import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../objects/Recipe';
declare var jquery: any;
declare var $: any;
const MAX_STARS = 5;

const recipesUrl = 'http://localhost:3000/api/recipes';

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
  private preparationTime = '00:00';
  public recipeList = [];


  constructor(
    private http: HttpClient,
    private el: ElementRef,
    private route: ActivatedRoute,
    private router: Router
  ) {
    //let r1 = new Recipe(-1, 'admin', 'Tarte aux fraises', '', '45:00', 'Some steps', 'DESSERT', 10, 2);
    //let r2 = new Recipe(-1, 'admin', 'Tarte aux fraises', '', '45:00', 'Some steps', 'DESSERT', 10, 2);

    //this.recipeList.push(r1, r2);

    this.route.queryParams.forEach(params => {
      this.ingredientsList = params.ingredients;
      this.preparationTime = params.pTime.replace(/m/g, ':');
      this.mark = params.mark;
      this.types = params.types;
    });

    if(this.ingredientsList == null || this.ingredientsList == undefined) {
      this.loadAll().subscribe((value: any) => {
        if(value) this.recipeList = value;
      });
    }
    else {
      this.loadRecipes().subscribe((value: any) => {
        if(value) this.recipeList = value;
      });
    }
  }

  ngOnInit() {



  //

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

  loadRecipes() {
    let params = new HttpParams();
    /*const filteredTypes = this.types.filter(type => { type.toString().includes("true") })
      console.log(filteredTypes);
    filteredTypes.forEach(type => {
      params = params.append('types[]', type[0].toString());
    });*/
    this.ingredientsList.forEach(ingredient => {
      params = params.append('ingredients[]', ingredient);
    });

    console.log(params.get('ingredients[]'));
  /*  if (this.preparationTime != '00:00')
      params = params.append('preparation_time', this.preparationTime);

      if (this.mark != -1)
        params = params.append('mark', this.mark.toString());*/

    return this.http.get<Recipe[]>(recipesUrl, { params: params }).map((response: any) => {
      if (response) {
        return response;
      }
    });
  }

  loadAll() {
    return this.http.get<Recipe[]>(recipesUrl+"All").map((response: any) => {
      if (response) {
        return response;
      }
    });
  }

  loadRecipe(item) {

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


  adapt(name) {
    return name.replace(/ /g, '-');
  }

}
