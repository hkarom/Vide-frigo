import { Injectable, Inject, Component, OnInit, ElementRef, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from '../services/auth.service';

const recipesUrl = 'http://localhost:3000/api/recipes/';
@Component({
  selector: 'app-addrecipe',
  templateUrl: './addrecipe.component.html',
  styleUrls: ['./addrecipe.component.css']
})
export class AddrecipeComponent implements OnInit {
private addrecipeForm: FormGroup;
private nameTypes = [['Starter', true], ['Dish', true], ['Dessert', true]];
public recipes:any;
private id_creator;
private id;
private input : FormData;
private namerecip;
  @ViewChild("fileInput") fileInput;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
      private el: ElementRef,
    private fb: FormBuilder
  ) {
      //this.ingredient = new FormControl(null, [Validators.required]);
    this.addrecipeForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(2)]],
      cooking_time: ['', [Validators.required]],
      preparation_time:  ['', [Validators.required]],
        ingredient:  [null, [Validators.required]],
      steps:   [null, [Validators.required]],
      category:'',
      }); }

  ngOnInit() {
    $('.timepicker').pickatime({
   default: 'now', // Set default time: 'now', '1:30AM', '16:30'
   fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
   twelvehour: false, // Use AM/PM or 24-hour format
   donetext: 'OK', // text for done-button
   cleartext: 'Clear', // text for clear-button
   canceltext: 'Cancel', // Text for cancel-button
   autoclose: false, // automatic close timepicker
   ampmclickable: true, // make AM PM clickable
   aftershow: function(){} //Function for after opening timepicker
 });

  }

  ngOnSubmit() {
    this.namerecip=localStorage.getItem('name');
    alert(this.namerecip);
    this.id_creator=localStorage.getItem('user.id');
            this.http.post(recipesUrl + this.id_creator, this.addrecipeForm.value).subscribe((recipes) =>{
            // this.loadPicture().subscribe((recipes) => {  });
             this.recipes = recipes;
        }, (error) => { // error
          console.log(error);
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
      headers = headers.set('recipes',  localStorage.getItem('recipes.name'));
      alert(headers);
      return this.http.post('http://localhost:3000/recipe/uploadrecipe', this.input, {headers: headers}).map((data: any) => {
        console.log(data);
        localStorage.setItem('recipes.picture', data.picture);
      }, err => { console.log('err'); });
  }

  checkMe(index) {
    alert("check me")
    this.nameTypes[index][1] = !this.nameTypes[index][1];
    this.nameTypes[index][1] == true ?
    this.el.nativeElement.querySelectorAll('input[type=checkbox]')[index].setAttribute('checked', 'checked') :
    this.el.nativeElement.querySelectorAll('input[type=checkbox]')[index].removeAttribute('checked');
  }

}
