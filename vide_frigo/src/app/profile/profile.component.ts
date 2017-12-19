import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { User } from '../objects/User';
import { Recipe } from '../objects/Recipe';
declare var jquery: any;
declare var $: any;

const userUrl = 'http://localhost:3000/auth/user/';
const recipesUrl = 'http://localhost:3000/auth/recipes/';
const favoritesUrl = 'http://localhost:3000/auth/favorites/';
const commentsUrl = 'http://localhost:3000/auth/comments/';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private userdataForm: FormGroup;
  private input: FormData;
  private favorites = [];
  private recipes = [];
  private comments = [];

  private user: User;
  private section = 1;

  @ViewChild("fileInput") fileInput;

  constructor(
    private http: HttpClient,
    private el: ElementRef,
    private fb: FormBuilder
  ) {
    const password = new FormControl(null, [Validators.required, Validators.minLength(8)]);
    const verifPassword = new FormControl(null, [Validators.required, CustomValidators.equalTo(password)]);
    this.userdataForm = this.fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required, CustomValidators.email]],
      password: password,
      confirmPassword: verifPassword,
      description: null
    });

  }

  ngOnInit() {

    console.log(localStorage.getItem('user.picture'));
    this.user = new User(
      Number(localStorage.getItem('user.id')),
      localStorage.getItem('user.username'),
      localStorage.getItem('user.email'),
      localStorage.getItem('user.description'),
      localStorage.getItem('user.picture')
    )

    console.log(this.user.picture);

    $(".button-collapse").sideNav({
      menuWidth: 400,
      edge: 'right',
    });
  }

  ngOnSubmit() {
    this.http.patch(userUrl + this.user.id, this.userdataForm.value)
      .map((result: any) => {
        if (result.error)
          console.log(result.error);
        else {
          if (this.input != null) {
            this.loadPicture().subscribe((result: any) => { });
          }
          this.changeSection(2);
        }
      }, err => {
        console.log(err);
      });
  }

  addFile(): void {
    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      this.input = new FormData();
      this.input.append("file", fileToUpload, fileToUpload.name);
    }
  }


  loadPicture() {
    let headers = new HttpHeaders();
    headers = headers.set('username', localStorage.getItem('user.username'));
    return this.http.post('http://localhost:3000/api/upload', this.input, { headers: headers }).map((data: any) => {
      console.log(data);
      localStorage.setItem('user.picture', data.picture);
    }, err => { console.log('err'); });
  }


  changeSection(index) {
    let menuItem = this.el.nativeElement.querySelectorAll('.menu');
    this.section = index;
    for (let i = 0; i < menuItem.length; i++) {
      if (i === index - 1) menuItem[i].classList.add('active');
      else menuItem[i].classList.remove('active');
    }
  }



  postedRecipes() {
    this.http.get<Recipe[]>(recipesUrl + this.user.id)
      .map((result: any) => {
        if (result.error)
          console.log(result.error);
        else {
          this.recipes = result;
        }
      }, err => {
        console.log(err);
      });
  }

  favoritesRecipes() {
    this.http.get<Recipe[]>(favoritesUrl + this.user.id)
      .map((result: any) => {
        if (result.error)
          console.log(result.error);
        else {
          this.favorites = result;
        }
      }, err => {
        console.log(err);
      });
  }

  postedComments() {
    this.http.get<Comment[]>(commentsUrl + this.user.id)
      .map((result: any) => {
        if (result.error)
          console.log(result.error);
        else {
          this.comments = result;
        }
      }, err => {
        console.log(err);
      });
  }

}
