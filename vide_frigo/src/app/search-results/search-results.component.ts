import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  public recipeList = [];

  constructor() { }

  ngOnInit() {
  }

}