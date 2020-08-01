import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nomovieslikeddialog',
  templateUrl: './nomovieslikeddialog.component.html',
  styleUrls: ['./nomovieslikeddialog.component.css'],
})
export class NomovieslikeddialogComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  clickedHome() {
    this.router.navigate(['search']);
  }

  clickedMovieboard() {
    this.router.navigate(['movieboard']);
  }
}
