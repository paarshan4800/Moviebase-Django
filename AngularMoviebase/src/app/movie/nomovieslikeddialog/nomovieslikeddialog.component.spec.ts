import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NomovieslikeddialogComponent } from './nomovieslikeddialog.component';

describe('NomovieslikeddialogComponent', () => {
  let component: NomovieslikeddialogComponent;
  let fixture: ComponentFixture<NomovieslikeddialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NomovieslikeddialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NomovieslikeddialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
