import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesAddedComponent } from './recipes-added.component';

describe('RecipesAddedComponent', () => {
  let component: RecipesAddedComponent;
  let fixture: ComponentFixture<RecipesAddedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipesAddedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
