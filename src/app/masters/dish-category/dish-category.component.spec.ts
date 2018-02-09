import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishCategoryComponent } from './dish-category.component';

describe('DishCategoryComponent', () => {
  let component: DishCategoryComponent;
  let fixture: ComponentFixture<DishCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
