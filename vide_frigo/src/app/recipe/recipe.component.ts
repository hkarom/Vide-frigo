import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../objects/Recipe';
import { Comment } from '../objects/Comment';

const ingredientsUrl = 'http://localhost:3000/ingredients/';
const commentsUrl = 'http://localhost:3000/comments/';
const recipeUrl = 'http://localhost:3000/recipe/';
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
  private ingredientsList = ['pomme', 'chocolat', 'fraise', 'poireau', 'courgette', 'sel'];
  private section = 1;
  private userName = localStorage.getItem('user.username');
  private marks = [1,2,3,4,5];
  private commentMark = 0;

  constructor(
    private http: HttpClient,
    private el: ElementRef,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    /*this.route.queryParams.forEach(params => {
      let recipeId = params.id;
      this.http.get<Recipe>(recipeUrl + recipeId).map((response: any) => {
        if (response) {
          this.recipe = response;
        }
      });
    });*/
    let c1 = new Comment(-1,'Lulu',-1,"Very good !", 5);
    let c2 = new Comment(-1,'chambo147852',-1,"Un commentaire très très très long tellement long que même l'écrire est long, d'ailleur on y trouve trois fois le mot long ce qui est beaucoup...", 3);

    this.commentsList.push(c1,c2);

    this.recipe = new Recipe(-1, -1, 'Tarte aux fraises', 'admin', '30:00', '45:00', 'Some steps', 'DESSERT', 10,2);
    this.commentForm = this.fb.group({
      message: [null, [Validators.required, Validators.minLength(8)]],
      mark: [null, [Validators.required]],
      id_recipe: this.recipe.id,
      id_user: localStorage.getItem('user.id')
    });
  }

  ngOnInit() {
    //this.loadIngredients();
    //this.loadComments();
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

  loadIngredients() {
    this.http.get(ingredientsUrl + this.recipe.id).map((response: any) => {
      if (response) {
        this.ingredientsList = response;
      }
    });
  }

  loadComments() {
    this.http.get(commentsUrl + this.recipe.id).map((response: any) => {
      if (response) {
        this.commentsList = response;
      }
    });
  }

  sendComment() {
    this.http.post(commentsUrl + this.recipe.id, this.commentForm.value).map((response: any) => {
      if (response) {
        this.loadComments();
        alert('comment posted successfully');
      }
    });
  }

}
