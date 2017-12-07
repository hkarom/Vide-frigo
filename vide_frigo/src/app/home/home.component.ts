import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


const ingredientsUrl = 'http://localhost:3000/api/ingredients';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private ingredientForm: FormGroup;
  private filteredList = [];
  private ingredientSelected = { search: '' };

  cpt: number;
  goal: string = "eau";
  goals = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private el: ElementRef,
  ) {
    this.ingredientForm = this.fb.group({
      search: [null, [Validators.required]],
    });

    this.ingredientForm.valueChanges.subscribe(data => {
      if (data !== '') {
        this.http.post(ingredientsUrl, data).subscribe((value: any) => {

          if (value.error) {
            console.log(value.error);
          } else {
            this.filteredList = value;
            console.log(this.filteredList );
          }
        }, error => console.log(error));
      }
    });


  }

  ngOnInit() {
  }

  ngOnSubmit() {

    const selectElement = this.el.nativeElement.querySelector('.collection .active');
    console.log(selectElement);
    if (selectElement !== null) selectElement.click();

  }


  sendMe(index) {
    this.ingredientSelected = this.filteredList[index];
    this.el.nativeElement.querySelector('#search').value = '';
    this.filteredList = [];
    this.goals.push(this.ingredientSelected.search);
  }

  onUp(event: KeyboardEvent) {
    if (this.el.nativeElement.querySelector('.collection .collection-item') !== null) {
      let list = this.el.nativeElement.querySelector('.collection .active');
      if (list == null) {
        list = this.el.nativeElement.querySelector('.collection .collection-item:last-child');
        list.classList.add('active');
      } else {
        list.classList.remove('active');
        if (list.previousSibling.classList !== undefined) list.previousSibling.classList.add('active');
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
        if (list.nextSibling.classList !== undefined) list.nextSibling.classList.add('active');
      }
    }
  }

}
