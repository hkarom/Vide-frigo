import { Injectable, Inject, Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../services/common.service';
//import { MatDrawerContent, MatDrawer } from '@angular/material';

declare var jquery: any;
declare var $: any;

const ingredientsUrl = 'http://localhost:3000/api/ingredients';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public scrollbarOptions = { axis: 'y', theme: 'dark-thin', scrollButtons: { enable: true } };
  private ingredientForm: FormGroup;
  private filteredList = [];
  private nameTypes = [['Starter', true], ['Dish', true], ['Dessert', true]];
  private searchForcus = false;
  ingredientsList = [];


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private el: ElementRef,
    private se: CommonService
  ) {
    this.ingredientForm = this.fb.group({
      search: [null, [Validators.required]],
    });

    this.resetList().subscribe(data => { this.filteredList = data; });
    this.ingredientForm.valueChanges.subscribe(data => {
      if (data !== '') {
        this.http.post(ingredientsUrl, data).subscribe((value: any) => {
          if (value.error) {
            console.log(value.error);
          } else {
            this.filteredList = value;
            console.log(this.filteredList);
          }
        }, error => console.log(error));
      }
    });
  }

  ngOnInit() {
    this.se.add_subject.subscribe(response => {
      this.filteredList = this.se.filteredList
    })

    $(".button-collapse").sideNav({
      menuWidth: 400,
      edge: 'right',
    });
  }


  ngOnSubmit() {
    const selectElement = this.el.nativeElement.querySelector('.collection .active');
    console.log(selectElement);
    if (selectElement !== null) selectElement.click();

  }

  checkMe(index) {
    this.nameTypes[index][1] = !this.nameTypes[index][1];
    this.nameTypes[index][1] == true ?
    this.el.nativeElement.querySelectorAll('input[type=checkbox]')[index].setAttribute('checked', 'checked') :
    this.el.nativeElement.querySelectorAll('input[type=checkbox]')[index].removeAttribute('checked');
  }

  searchOnFocus() {
    return this.searchForcus;
  }


  sendMe(index) {
    if (this.ingredientsList.length < 15) {
      if (this.ingredientsList.indexOf(this.filteredList[index].search) == -1) {
        this.el.nativeElement.querySelector('#search').value = '';
        this.resetList();
        this.ingredientsList.push(this.filteredList[index].search);
      }
    }
  }

  removeMe(element) {
    this.ingredientsList.splice(this.ingredientsList.indexOf(element), 1);
  }

  onUp(event: KeyboardEvent) {
    if (this.el.nativeElement.querySelector('.collection .collection-item') !== null) {
      let list = this.el.nativeElement.querySelector('.collection .active');
      if (list == null) {
        list = this.el.nativeElement.querySelector('.collection .collection-item:last-child');
        list.classList.add('active');
      } else {
        list.classList.remove('active');
        if (list.previousSibling.classList !== undefined) {
          list.previousSibling.classList.add('active');
        }
      }
    }
  }


  onDown(event: KeyboardEvent) {
    if (this.el.nativeElement.querySelector('.collection .collection-item') !== null) {
      let list = this.el.nativeElement.querySelector('.collection .active');
      if (list == null) {
        list = this.el.nativeElement.querySelector('.collection .collection-item');
        list.classList.add('active');
      }
      else {
        list.classList.remove('active');
        if (list.nextSibling.classList !== undefined) {
          list.nextSibling.classList.add('active');
        }
      }
    }
  }

  resetList() {
    return this.http.get(ingredientsUrl).map((value: any) => {
      if (value.error) {
        console.log(value.error);
      } else {
        return value;
      }
    }, error => console.log(error));
  }


}
