import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { NomovieslikeddialogComponent } from '../nomovieslikeddialog/nomovieslikeddialog.component';

@Component({
  selector: 'app-likedmovies',
  templateUrl: './likedmovies.component.html',
  styleUrls: ['../displaymovie.css'],
})
export class LikedmoviesComponent implements OnInit {
  MovieList;
  noMoviesLiked: boolean;

  constructor(
    private movieservice: MovieService,
    private cookie: CookieService,
    public dialog: MatDialog
  ) {
    this.movieservice.pyGetLikedList().subscribe(
      (data) => {
        if (data.status === false) {
          this.noMoviesLiked = true;
          console.log(data);
          this.openDialog();
        } else {
          this.noMoviesLiked = false;
          this.MovieList = data.movieList;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openDialog() {
    this.dialog.open(NomovieslikeddialogComponent, {
      backdropClass: 'dialogBG',
      disableClose: true,
      autoFocus: false
    });
  }

  ngOnInit(): void {
    this.noMoviesLiked = false;
  }
}
