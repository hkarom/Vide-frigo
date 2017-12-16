import { Injectable } from '@angular/core';
import { HomeComponent } from '../home/home.component'
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CommonService {
    public filteredList = [];
    public add_subject = new Subject()

    constructor(){
        this.filteredList = []
    }

    getIngredients(name){
        this.filteredList.push(name);
        this.add_subject.next();
    }
}
