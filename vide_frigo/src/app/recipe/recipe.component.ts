import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../objects/Recipe';
import { Comment } from '../objects/Comment';

const ingredientsUrl = 'http://localhost:3000/api/ingredients/';
const commentsUrl = 'http://localhost:3000/api/comments/';
const recipeUrl = 'http://localhost:3000/api/recipe/';
const MAX_STARS = 5;

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  private commentForm: FormGroup;
  private recipe: Recipe;
  private commentsList = [];
  private ingredientsList = [];
  private section = 1;
  private userName = localStorage.getItem('user.username');
  private marks = [1,2,3,4,5];
  private commentMark = 0;
  private stepsList = [];

  constructor(
    private http: HttpClient,
    private el: ElementRef,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {

    this.commentForm = this.fb.group({
      message: [null, [Validators.required, Validators.minLength(8)]],
      mark: [null, [Validators.required]],
      id_user: localStorage.getItem('user.id')
    });
  }

  ngOnInit() {
    this.route.queryParams.forEach(params => {
      let recipeId = params.recipe;
      this.getRecipe(params.recipe).subscribe((response: any) => {
        if (response) {
          this.recipe = response;
          this.stepsList = this.recipe.steps.split('|');
        }
      });
      this.loadIngredients(params.recipe).subscribe((response: any) => {
        this.ingredientsList = response;
      });
      this.loadComments(params.recipe).subscribe((response: any) => {
        this.commentsList = response;
      });
    });
  }

  getRecipe(id) {
    return this.http.get<Recipe>(recipeUrl + id).map((response: any) => {
      if (response) {
        return response;
      }
    });
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


  //calculMark()

  loadIngredients(id) {
    return this.http.get(ingredientsUrl + id).map((response: any) => {
      if (response) {
        return response;
      }
    });
  }

  loadComments(id) {
  return this.http.get(commentsUrl + id).map((response: any) => {
      if (response) {
        return response;
      }
    });
  }

  sendComment() {
    this.http.post(commentsUrl + this.recipe.id, this.commentForm.value).subscribe((response: any) => {
      if (response) {
        this.loadComments(this.recipe.id).subscribe((res) => {
          this.commentsList = res;
        })
        alert('comment posted successfully');
      }
    });
  }

}
