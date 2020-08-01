import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviegridComponent } from './moviegrid.component';

describe('MoviegridComponent', () => {
  let component: MoviegridComponent;
  let fixture: ComponentFixture<MoviegridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviegridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
