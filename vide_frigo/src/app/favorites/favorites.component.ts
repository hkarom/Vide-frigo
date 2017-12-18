import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const urlfavorites = 'http://localhost:3000/api/favorites'
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  public  favorites;
 private id;
  constructor(private http: HttpClient,
    private router: Router) { }

  ngOnInit() {
    this.id= localStorage.getItem('user.id');
       this.http.post(urlfavorites, { id: this.id }).subscribe((favorites) => {
       this.favorites = favorites;
     },
       error => {
         console.log(error);
       });


       $(".button-collapse").sideNav({
         menuWidth: 400,
         edge: 'right',
       });
     
  }

}
