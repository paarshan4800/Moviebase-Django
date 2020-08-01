import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieboardComponent } from './movieboard.component';

describe('MovieboardComponent', () => {
  let component: MovieboardComponent;
  let fixture: ComponentFixture<MovieboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
